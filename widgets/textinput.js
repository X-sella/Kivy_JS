import { Widget } from "../core/widget.js";
import { TextInputStyle } from "../styles/textInputStyle.js";

export class TextInput extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-textinput");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new TextInputStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Input element
    this.input = document.createElement(options.multiline ? "textarea" : "input");
    this.input.type = options.multiline ? undefined : "text";
    this.input.value = options.value || "";
    this.input.placeholder = options.placeholder || "";
    this.input.rows = options.rows || 3;
    this.input.cols = options.cols || 20;

    // Inline styling
    if (options.style) this.style = options.style;

    // Events
    if (options.onChange) this.input.addEventListener("change", options.onChange);
    if (options.onInput) this.input.addEventListener("input", options.onInput);
    if (options.onFocus) this.input.addEventListener("focus", options.onFocus);
    if (options.onBlur) this.input.addEventListener("blur", options.onBlur);

    this.addChild(this.input);
  }

  /** Get value */
  getValue() {
    return this.input.value;
  }

  /** Set value */
  setValue(value) {
    this.input.value = value;
  }

  /** Focus */
  focus() {
    this.input.focus();
  }

  /** Blur */
  blur() {
    this.input.blur();
  }
}