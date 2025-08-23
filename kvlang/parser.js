import { Widget } from "../core/widget.js";
import * as Widgets from "../widgets/index.js"; // all widgets exported here

export class KVParser {
  constructor() {}

  /**
   * Parse KV-style string into a JS object tree
   */
  parseString(kvString) {
    const lines = kvString.split("\n").map(line => line.replace(/\r/g, ""));
    const rootStack = [];
    let root = null;

    lines.forEach(line => {
      if (!line.trim()) return;
      const indent = line.match(/^\s*/)[0].length;
      const trimmed = line.trim();

      if (trimmed.includes(":") && !trimmed.endsWith(":")) {
        const [key, value] = trimmed.split(/:(.+)/).map(s => s.trim());
        if (rootStack.length) {
          const parent = rootStack[rootStack.length - 1].node;
          parent[key] = this._parseValue(value, key);
        }
      } else {
        const type = trimmed.replace(/:$/, "");
        const node = { type, children: [] };
        if (!root) {
          root = node;
        } else {
          while (rootStack.length && indent <= rootStack[rootStack.length - 1].indent) {
            rootStack.pop();
          }
          const parent = rootStack[rootStack.length - 1].node;
          parent.children.push(node);
        }
        rootStack.push({ node, indent });
      }
    });

    return root;
  }

  /** Parse property values, including JS callbacks for events */
  _parseValue(val, key) {
    if (val === "true") return true;
    if (val === "false") return false;
    if (!isNaN(Number(val))) return Number(val);
    if (key && key.startsWith("on")) {
      // Parse JS inline function safely
      try {
        return new Function(val); // e.g., onClick: alert("Hi")
      } catch (e) {
        console.error("KVParser: Error parsing function", val, e);
        return null;
      }
    }
    return val.replace(/^["']|["']$/g, "");
  }

  /** Convert KV object tree into Kivy.js widgets */
  parse(kvObj) {
    if (!kvObj || !kvObj.type) return null;

    const WidgetClass = Widgets[kvObj.type] || Widget;
    const instance = new WidgetClass(kvObj);

    // Apply style
    if (kvObj.style) instance.el.style.cssText += kvObj.style;

    // Apply event callbacks (onClick, onToggle, etc.)
    Object.keys(kvObj).forEach(key => {
      if (key.startsWith("on") && typeof kvObj[key] === "function") {
        const eventName = key.slice(2).toLowerCase(); // onClick → click
        instance.el.addEventListener(eventName, kvObj[key]);
      }
    });

    // Recursively parse children
    if (kvObj.children && kvObj.children.length > 0) {
      kvObj.children.forEach(child => {
        const childWidget = this.parse(child);
        if (childWidget && instance.el.appendChild) {
          instance.el.appendChild(childWidget.render());
        }
      });
    }

    return instance;
  }

  /** Parse KV string directly to widget */
  parseToWidget(kvString) {
    const objTree = this.parseString(kvString);
    return this.parse(objTree);
  }
}