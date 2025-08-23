import { Widget } from "../core/widget.js";

export class Separator extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-separator");

    // Orientation: 'horizontal' or 'vertical'
    this.orientation = options.orientation || "horizontal";

    // Styles
    this.color = options.color || "var(--kivy-text)";
    this.thickness = options.thickness || "1px";
    this.margin = options.margin || "8px";
    this.length = options.length || "100%"; // width or height depending on orientation
    this.style = options.style || "";

    // Apply initial style
    this.applyStyle();
  }

  applyStyle() {
    if (this.orientation === "horizontal") {
      this.el.style.width = this.length;
      this.el.style.height = this.thickness;
      this.el.style.borderBottom = `${this.thickness} solid ${this.color}`;
      this.el.style.margin = `${this.margin} 0`;
    } else {
      this.el.style.width = this.thickness;
      this.el.style.height = this.length;
      this.el.style.borderLeft = `${this.thickness} solid ${this.color}`;
      this.el.style.margin = `0 ${this.margin}`;
    }

    if (this.style) this.el.style.cssText += this.style;
  }

  /** Render the separator */
  render() {
    return this.el;
  }
}