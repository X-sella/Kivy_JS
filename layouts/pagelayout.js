import { Widget } from "../core/widget.js";
import { LayoutStyle } from "../styles/layoutStyle.js";

// Ensure layout CSS is injected once
if (!document.getElementById("kivy-layout-style")) {
  new LayoutStyle().inject();
  const styleEl = document.querySelector("style:last-of-type");
  styleEl.id = "kivy-layout-style";
}

export class PageLayout extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-pagelayout");

    this.spacing = options.spacing || 8;
    this.padding = options.padding || 8;

    if (options.style) this.el.style.cssText += options.style;

    // Apply default styles
    this.applyStyle();
  }

  applyStyle() {
    this.el.style.display = "flex";
    this.el.style.overflowX = "auto";
    this.el.style.scrollSnapType = "x mandatory";
    this.el.style.gap = this.spacing + "px";
    this.el.style.padding = this.padding + "px";
  }

  /** Add child widget as a page */
  addWidget(widget) {
    if (!widget || !widget.render) return;

    const el = widget.render();
    el.style.scrollSnapAlign = "start";
    el.style.flexShrink = 0; // prevent shrinking
    this.el.appendChild(el);
  }

  render() {
    return this.el;
  }
}