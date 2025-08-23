import { Widget } from "../core/widget.js";
import { ColorPickerStyle } from "../styles/colorPickerStyle.js";

export class ColorPicker extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("colorpicker-container");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new ColorPickerStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Current color preview
    this.preview = document.createElement("div");
    this.preview.classList.add("colorpicker-preview");

    // Hex input field
    this.hexInput = document.createElement("input");
    this.hexInput.type = "text";
    this.hexInput.maxLength = 7;
    this.hexInput.value = options.value || "#ffffff";
    this.hexInput.classList.add("colorpicker-hex");

    // RGB sliders
    this.sliders = {};
    ["r", "g", "b"].forEach((ch) => {
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = 0;
      slider.max = 255;
      slider.value = parseInt(this.hexInput.value.slice(1 + ["r","g","b"].indexOf(ch)*2,3 + ["r","g","b"].indexOf(ch)*2),16) || 255;
      slider.classList.add(`colorpicker-slider-${ch}`);
      this.sliders[ch] = slider;
    });

    // Append elements
    this.addChild(this.preview);
    this.addChild(this.hexInput);
    Object.values(this.sliders).forEach(s => this.addChild(s));

    // Apply inline styles
    if (options.style) this.style = options.style;

    // Event handlers
    const updateColor = () => {
      const r = parseInt(this.sliders.r.value);
      const g = parseInt(this.sliders.g.value);
      const b = parseInt(this.sliders.b.value);
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      this.preview.style.backgroundColor = hex;
      this.hexInput.value = hex;
      if (options.onChange) options.onChange(hex);
    };

    // Slider changes
    Object.values(this.sliders).forEach(s => s.addEventListener("input", updateColor));

    // Hex input changes
    this.hexInput.addEventListener("input", () => {
      const hex = this.hexInput.value;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        this.preview.style.backgroundColor = hex;
        ["r","g","b"].forEach((ch,i) => this.sliders[ch].value = parseInt(hex.slice(1 + i*2,3 + i*2),16));
        if (options.onChange) options.onChange(hex);
      }
    });

    // Initialize color
    updateColor();
  }

  /** Get current color */
  getColor() { return this.hexInput.value; }

  /** Set color programmatically */
  setColor(hex) {
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      this.hexInput.value = hex;
      Object.values(this.sliders).forEach((s, i) => s.value = parseInt(hex.slice(1 + i*2, 3 + i*2), 16));
      this.preview.style.backgroundColor = hex;
    }
  }
}