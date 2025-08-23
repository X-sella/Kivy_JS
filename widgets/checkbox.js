import { Widget } from "../core/widget.js";
import { CheckboxStyle } from "../styles/checkboxStyle.js";

export class Checkbox extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-checkbox");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new CheckboxStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Checkbox input
    this.input = document.createElement("input");
    this.input.type = "checkbox";
    this.input.checked = options.checked || false;
    this.input.classList.add("checkbox-input");

    // Label (optional)
    this.label = document.createElement("span");
    this.label.classList.add("checkbox-label");
    this.label.textContent = options.text || "";

    // Container
    this.container = document.createElement("label");
    this.container.classList.add("checkbox-container");
    this.container.appendChild(this.input);
    this.container.appendChild(this.label);

    this.addChild(this.container);

    // Inline styling
    if (options.style) this.style = options.style;

    // Event
    this.input.addEventListener("change", () => {
      if (options.onToggle) options.onToggle(this.input.checked);
      if (options.onChange) options.onChange(this.input.checked);
    });
  }

  /** Get checkbox state */
  getValue() {
    return this.input.checked;
  }

  /** Set checkbox state */
  setValue(val) {
    this.input.checked = val;
  }

  /** Toggle checkbox state */
  toggle() {
    this.input.checked = !this.input.checked;
    this.input.dispatchEvent(new Event("change"));
  }
}