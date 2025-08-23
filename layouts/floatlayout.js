import { Widget } from "../core/widget.js";
import { LayoutStyle } from "../styles/layoutStyle.js";

// Ensure layout CSS is injected once
if (!document.getElementById("kivy-layout-style")) {
  new LayoutStyle().inject();
  const styleEl = document.querySelector("style:last-of-type");
  styleEl.id = "kivy-layout-style";
}

export class FloatLayout extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-floatlayout");

    // Inline style overrides
    if (options.style) this.el.style.cssText += options.style;

    // Optional spacing and padding
    this.spacing = options.spacing || 0;
    this.padding = options.padding || 0;
    if (this.padding) this.el.style.padding = this.padding + "px";

    this.el.style.position = "relative"; // FloatLayout children use absolute positioning
  }

  /** Add child widget with optional position (x, y, width, height) */
  addWidget(widget, pos = {}) {
    if (!widget || !widget.render) return;

    const el = widget.render();
    el.style.position = "absolute";

    if (pos.x !== undefined) el.style.left = typeof pos.x === "number" ? pos.x + "px" : pos.x;
    if (pos.y !== undefined) el.style.top = typeof pos.y === "number" ? pos.y + "px" : pos.y;
    if (pos.width !== undefined) el.style.width = typeof pos.width === "number" ? pos.width + "px" : pos.width;
    if (pos.height !== undefined) el.style.height = typeof pos.height === "number" ? pos.height + "px" : pos.height;

    this.el.appendChild(el);
  }

  render() {
    return this.el;
  }
}