import { Widget } from "../core/widget.js";
import { LayoutStyle } from "../styles/layoutStyle.js";

// Ensure layout CSS is injected once
if (!document.getElementById("kivy-layout-style")) {
  new LayoutStyle().inject();
  const styleEl = document.querySelector("style:last-of-type");
  styleEl.id = "kivy-layout-style"; // prevent multiple injections
}

export class BoxLayout extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-boxlayout");

    // Orientation: horizontal/vertical
    this.orientation = options.orientation || "horizontal";
    this.el.classList.add(this.orientation);

    // Spacing and padding (inline overrides default)
    this.spacing = options.spacing || 0;
    this.padding = options.padding || 0;

    if (options.style) this.el.style.cssText += options.style;

    this.applyStyle();
  }

  applyStyle() {
    // Default layout styles come from layoutStyle.js
    this.el.style.gap = this.spacing ? this.spacing + "px" : "";
    this.el.style.padding = this.padding ? this.padding + "px" : "";
  }

  addWidget(widget) {
    if (widget && widget.render) this.el.appendChild(widget.render());
  }

  render() {
    return this.el;
  }
}