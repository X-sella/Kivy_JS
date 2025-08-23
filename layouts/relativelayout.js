import { Widget } from "../core/widget.js";
import { LayoutStyle } from "../styles/layoutStyle.js";

// Inject layout CSS if not already
if (!document.getElementById("kivy-layout-style")) {
  new LayoutStyle().inject();
  const styleEl = document.querySelector("style:last-of-type");
  styleEl.id = "kivy-layout-style";
}

export class RelativeLayout extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-relativelayout");

    if (options.style) this.el.style.cssText += options.style;

    this.padding = options.padding || 0;
    if (this.padding) this.el.style.padding = this.padding + "px";

    this.el.style.position = "relative"; // relative positioning for children
  }

  /**
   * Add child widget with relative position
   * pos: { xPercent, yPercent, widthPercent, heightPercent }
   * OR keywords: top, bottom, left, right, centerX, centerY
   */
  addWidget(widget, pos = {}) {
    if (!widget || !widget.render) return;
    const el = widget.render();
    el.style.position = "absolute";

    // Percentage positioning
    if (pos.xPercent !== undefined) el.style.left = pos.xPercent + "%";
    if (pos.yPercent !== undefined) el.style.top = pos.yPercent + "%";
    if (pos.widthPercent !== undefined) el.style.width = pos.widthPercent + "%";
    if (pos.heightPercent !== undefined) el.style.height = pos.heightPercent + "%";

    // Keyword positioning
    if (pos.top !== undefined) el.style.top = typeof pos.top === "number" ? pos.top + "px" : pos.top;
    if (pos.bottom !== undefined) el.style.bottom = typeof pos.bottom === "number" ? pos.bottom + "px" : pos.bottom;
    if (pos.left !== undefined) el.style.left = typeof pos.left === "number" ? pos.left + "px" : pos.left;
    if (pos.right !== undefined) el.style.right = typeof pos.right === "number" ? pos.right + "px" : pos.right;
    if (pos.centerX) el.style.left = "50%"; el.style.transform = (el.style.transform || "") + " translateX(-50%)";
    if (pos.centerY) el.style.top = "50%"; el.style.transform = (el.style.transform || "") + " translateY(-50%)";

    this.el.appendChild(el);
  }

  render() {
    return this.el;
  }
}