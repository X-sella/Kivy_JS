import { Widget } from "../core/widget.js";
import { ProgressBarStyle } from "../styles/progressBarStyle.js";

export class ProgressBar extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-progressbar");

    // Attach styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new ProgressBarStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Config
    this.orientation = options.orientation || "horizontal";
    this.min = options.min ?? 0;
    this.max = options.max ?? 100;
    this.value = options.value ?? this.min;
    this.blocks = options.blocks ?? 20;
    this.shape = options.shape || "block"; // "block", "pill", "circle"
    this.gap = options.gap ?? 2;
    this.onChange = options.onChange || null;

    // Effects
    this.fillColor = options.fillColor || "#4CAF50";
    this.emptyColor = options.emptyColor || "#ddd";
    this.gradient = options.gradient || null;
    this.shadow = options.shadow || null;
    this.stripes = options.stripes || false;
    this.borderRadius = options.borderRadius ?? 6;

    // Container
    this.container = document.createElement("div");
    this.container.classList.add("progressbar-container");

    // Create blocks
    this.blockEls = [];
    for (let i = 0; i < this.blocks; i++) {
      const el = document.createElement("div");
      el.classList.add("progressbar-block");
      el.style.margin = `${this.gap / 2}px`;

      if (this.shadow) el.style.boxShadow = this.shadow;
      if (this.stripes) {
        el.style.backgroundImage = `repeating-linear-gradient(
          45deg,
          ${this.fillColor},
          ${this.fillColor} 10px,
          #ffffff22 10px,
          #ffffff22 20px
        )`;
        el.style.animation = "progressbar-stripes 1s linear infinite";
      }

      this.container.appendChild(el);
      this.blockEls.push(el);
    }

    if (options.style) this.style = options.style;

    this.addChild(this.container);
    this.updateProgress();
  }

  /** Update progress visually */
  updateProgress() {
    const percent = ((this.value - this.min) / (this.max - this.min)) * this.blocks;
    this.blockEls.forEach((el, i) => {
      // Fill color or gradient
      if (i < percent) {
        el.style.backgroundColor = this.fillColor;
        if (this.gradient) el.style.backgroundImage = this.gradient;
      } else {
        el.style.backgroundColor = this.emptyColor;
        el.style.backgroundImage = "none";
      }

      // Shape
      if (this.shape === "circle") el.style.borderRadius = "50%";
      else if (this.shape === "pill") el.style.borderRadius = `${this.borderRadius}px`;
      else el.style.borderRadius = "2px";
    });
  }

  /** Set value programmatically */
  setValue(val) {
    this.value = Math.max(this.min, Math.min(this.max, val));
    this.updateProgress();
    if (this.onChange) this.onChange(this.value);
  }

  /** Get current value */
  getValue() {
    return this.value;
  }
}