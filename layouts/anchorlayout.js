import { Widget } from "../core/widget.js";
import { LayoutStyle } from "../styles/layoutStyle.js";

// Ensure layout CSS is injected once
if (!document.getElementById("kivy-layout-style")) {
  new LayoutStyle().inject();
  const styleEl = document.querySelector("style:last-of-type");
  styleEl.id = "kivy-layout-style";
}

export class AnchorLayout extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-anchorlayout");

    // Inline style overrides
    if (options.style) this.el.style.cssText += options.style;

    // Default alignment
    this.horizontal = options.horizontal || "left"; // left, center, right
    this.vertical = options.vertical || "top";      // top, center, bottom

    // Apply default alignment
    this.applyAlignment();
  }

  applyAlignment() {
    const justifyMap = {
      left: "flex-start",
      center: "center",
      right: "flex-end"
    };
    const alignMap = {
      top: "flex-start",
      center: "center",
      bottom: "flex-end"
    };

    this.el.style.display = "flex";
    this.el.style.justifyContent = justifyMap[this.horizontal];
    this.el.style.alignItems = alignMap[this.vertical];
  }

  /** Add child widget */
  addWidget(widget) {
    if (widget && widget.render) {
      this.el.appendChild(widget.render());
    }
  }

  render() {
    return this.el;
  }
}