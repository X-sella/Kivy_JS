import { Widget } from "../core/widget.js";
import { ButtonStyle } from "../styles/buttonStyle.js";

export class Button extends Widget {
  constructor(options = {}) {
    super();

    // Apply default style
    this.el.classList.add("kivy-button");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new ButtonStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Set button text
    this.setText(options.text || "Button");

    // Inline styling
    if (options.style) this.style = options.style;

    // Event listener
    if (options.onClick) {
      this.el.addEventListener("click", options.onClick);
    }
  }

  /** Set button text */
  setText(text) {
    this.el.textContent = text;
  }

  /** Get button text */
  getText() {
    return this.el.textContent;
  }
}