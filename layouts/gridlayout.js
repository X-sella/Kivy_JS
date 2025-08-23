import { Widget } from "../core/widget.js";
import { LayoutStyle } from "../styles/layoutStyle.js";

// Ensure layout CSS is injected once
if (!document.getElementById("kivy-layout-style")) {
  new LayoutStyle().inject();
  const styleEl = document.querySelector("style:last-of-type");
  styleEl.id = "kivy-layout-style";
}

export class GridLayout extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-gridlayout");

    // Columns and optional rows
    this.columns = options.columns || 2;
    this.rows = options.rows || null; // optional
    this.spacing = options.spacing || 8;
    this.padding = options.padding || 8;

    // Apply inline style overrides
    if (options.style) this.el.style.cssText += options.style;

    this.applyStyle();
  }

  applyStyle() {
    this.el.style.display = "grid";
    this.el.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    this.el.style.gap = this.spacing + "px";
    this.el.style.padding = this.padding + "px";
    this.el.style.boxSizing = "border-box";
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