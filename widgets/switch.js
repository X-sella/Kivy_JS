import { Widget } from "../core/widget.js";
import { SwitchStyle } from "../styles/switchStyle.js";

export class Switch extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-switch");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new SwitchStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Input checkbox for toggle
    this.input = document.createElement("input");
    this.input.type = "checkbox";
    this.input.checked = options.value || false;
    this.input.classList.add("switch-input");

    // Track and thumb container
    this.track = document.createElement("span");
    this.track.classList.add("switch-track");
    this.thumb = document.createElement("span");
    this.thumb.classList.add("switch-thumb");
    this.track.appendChild(this.thumb);

    this.el.appendChild(this.input);
    this.el.appendChild(this.track);

    // Inline styling
    if (options.style) this.style = options.style;

    // Events
    this.input.addEventListener("change", () => {
      if (options.onToggle) options.onToggle(this.input.checked);
      if (options.onChange) options.onChange(this.input.checked);
    });
  }

  /** Get switch state */
  getValue() {
    return this.input.checked;
  }

  /** Set switch state */
  setValue(val) {
    this.input.checked = val;
  }

  /** Toggle state */
  toggle() {
    this.input.checked = !this.input.checked;
    this.input.dispatchEvent(new Event("change"));
  }
}