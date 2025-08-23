import { Widget } from "../core/widget.js";
import { LabelStyle } from "../styles/labelStyle.js";

export class Label extends Widget {
  constructor(options = {}) {
    super();

    // Apply default style
    this.el.classList.add("label-container");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new LabelStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Set initial text
    this.setText(options.text || "");

    // Apply inline styles if provided
    if (options.style) this.style = options.style;
  }

  /**
   * Set label text
   * @param {string} text
   */
  setText(text) {
    this.el.textContent = text;
  }

  /**
   * Get label text
   * @returns {string}
   */
  getText() {
    return this.el.textContent;
  }
}