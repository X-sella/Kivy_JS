import { Widget } from "../core/widget.js";
import { SliderStyle } from "../styles/sliderStyle.js";

export class Slider extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-slider");

    // Attach styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new SliderStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Slider properties
    this.orientation = options.orientation || "horizontal"; // "horizontal" or "vertical"
    this.min = options.min ?? 0;
    this.max = options.max ?? 100;
    this.step = options.step ?? 1;
    this.value = options.value ?? this.min;
    this.onChange = options.onChange || null;

    // Visual effects
    this.thumbColor = options.thumbColor || "#4CAF50";
    this.trackColor = options.trackColor || "#ddd";
    this.gradient = options.gradient || null; // CSS gradient string
    this.shadow = options.shadow || null;     // CSS box-shadow string

    // Input element
    this.slider = document.createElement("input");
    this.slider.type = "range";
    this.slider.min = this.min;
    this.slider.max = this.max;
    this.slider.step = this.step;
    this.slider.value = this.value;

    // Orientation
    if (this.orientation === "vertical") {
      this.slider.style.writingMode = "bt-lr"; // vertical
      this.slider.style.height = options.height || "150px";
      this.slider.style.width = options.width || "30px";
    } else {
      this.slider.style.width = options.width || "200px";
      this.slider.style.height = options.height || "30px";
    }

    // Inline styling
    if (options.style) this.style = options.style;

    // Apply custom styles
    this.updateStyles();

    // Event
    this.slider.addEventListener("input", (e) => {
      this.value = parseFloat(this.slider.value);
      if (this.onChange) this.onChange(this.value);
    });

    this.addChild(this.slider);
  }

  /** Update visual styles dynamically */
  updateStyles() {
    const trackStyle = this.gradient
      ? `background-image: ${this.gradient};`
      : `background-color: ${this.trackColor};`;
    if (this.shadow) this.slider.style.boxShadow = this.shadow;
    this.slider.style.background = trackStyle;

    // Thumb styles
    const thumbStyle = `
      width: 20px;
      height: 20px;
      background-color: ${this.thumbColor};
      border-radius: 50%;
      border: 2px solid #333;
      cursor: pointer;
      ${this.shadow ? `box-shadow: ${this.shadow};` : ""}
    `;
    const sheet = document.createElement("style");
    sheet.innerHTML = `
      .kivy-slider input[type=range]::-webkit-slider-thumb { ${thumbStyle} }
      .kivy-slider input[type=range]::-moz-range-thumb { ${thumbStyle} }
    `;
    document.head.appendChild(sheet);
  }

  /** Set value programmatically */
  setValue(val) {
    this.value = Math.max(this.min, Math.min(this.max, val));
    this.slider.value = this.value;
    if (this.onChange) this.onChange(this.value);
  }

  /** Get current value */
  getValue() {
    return parseFloat(this.slider.value);
  }
}