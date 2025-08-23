// core/widget.js
import { EventDispatcher } from "./event.js";
import { defineProperty, Property } from "./properties.js";

/**
 * Base Widget class
 */
export class Widget extends EventDispatcher {
  constructor(options = {}) {
    super();

    // DOM element
    this.el = document.createElement("div");

    // Default reactive properties
    defineProperty(this, "size", new Property([100, 100]));  // [width, height]
    defineProperty(this, "pos", new Property([0, 0]));        // [x, y]
    defineProperty(this, "style", new Property(""));          // inline styles
    defineProperty(this, "visible", new Property(true));

    // Apply initial options
    Object.keys(options).forEach(key => {
      if (key in this) this[key] = options[key];
    });

    // Watch reactive properties
    this.size.bind(() => this._updateStyle());
    this.pos.bind(() => this._updateStyle());
    this.style.bind(() => this._updateStyle());
    this.visible.bind(v => this.el.style.display = v ? "" : "none");

    this._updateStyle();
  }

  /**
   * Add a child widget
   * @param {Widget} widget 
   */
  addWidget(widget) {
    if (!(widget instanceof Widget)) throw new Error("addWidget expects a Widget instance");
    this.el.appendChild(widget.el);
  }

  /**
   * Remove a child widget
   * @param {Widget} widget 
   */
  removeWidget(widget) {
    if (!(widget instanceof Widget)) return;
    if (this.el.contains(widget.el)) this.el.removeChild(widget.el);
  }

  /**
   * Render returns the DOM element
   */
  render() {
    return this.el;
  }

  /**
   * Update inline styles based on properties
   */
  _updateStyle() {
    const [w, h] = this.size.get();
    const [x, y] = this.pos.get();
    this.el.style.width = w + "px";
    this.el.style.height = h + "px";
    this.el.style.position = "absolute";
    this.el.style.left = x + "px";
    this.el.style.top = y + "px";
    this.el.style.cssText += this.style.get();
  }

  /**
   * Helper to set text content (used by Label, Button, etc.)
   */
  setText(txt) {
    this.el.textContent = txt;
  }

  /**
   * Helper to get value/content
   */
  getValue() {
    return this.el.textContent;
  }
}