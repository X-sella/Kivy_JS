import { Widget } from "../core/widget.js";
import { LayoutStyle } from "../styles/layoutStyle.js";

// Inject layout CSS if not already
if (!document.getElementById("kivy-layout-style")) {
  new LayoutStyle().inject();
  const styleEl = document.querySelector("style:last-of-type");
  styleEl.id = "kivy-layout-style";
}

export class StackLayout extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-stacklayout");

    // Orientation: 'horizontal' or 'vertical'
    this.orientation = options.orientation || "horizontal";
    this.el.classList.add(this.orientation);

    // Spacing and padding
    this.spacing = options.spacing || 8;
    this.padding = options.padding || 8;

    if (options.style) this.el.style.cssText += options.style;

    this.applyStyle();
  }

  applyStyle() {
    this.el.style.display = "flex";
    this.el.style.flexDirection = this.orientation === "vertical" ? "column" : "row";
    this.el.style.flexWrap = "wrap";
    this.el.style.gap = this.spacing + "px";
    this.el.style.padding = this.padding + "px";
    this.el.style.boxSizing = "border-box";
  }

  addWidget(widget) {
    if (widget && widget.render) this.el.appendChild(widget.render());
  }

  render() {
    return this.el;
  }
}