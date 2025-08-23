export class Theme {
  constructor() {
    // Default colors
    this.colors = {
      primary: "#2196F3",
      secondary: "#FFC107",
      accent: "#FF5722",
      background: "#f0f0f0",
      text: "#333"
    };

    // Default typography
    this.fontFamily = "Arial, sans-serif";
    this.fontSize = "14px";
    this.fontWeight = "normal";

    // Default widget styles
    this.widgetDefaults = {
      borderRadius: "6px",
      padding: "8px",
      margin: "4px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
    };

    // Inject default CSS
    this.injectCSS();
  }

  /** Generate default CSS string */
  getCSS() {
    return `
      :root {
        --kivy-primary: ${this.colors.primary};
        --kivy-secondary: ${this.colors.secondary};
        --kivy-accent: ${this.colors.accent};
        --kivy-background: ${this.colors.background};
        --kivy-text: ${this.colors.text};
        --kivy-font-family: ${this.fontFamily};
        --kivy-font-size: ${this.fontSize};
        --kivy-font-weight: ${this.fontWeight};
        --kivy-border-radius: ${this.widgetDefaults.borderRadius};
        --kivy-padding: ${this.widgetDefaults.padding};
        --kivy-margin: ${this.widgetDefaults.margin};
        --kivy-box-shadow: ${this.widgetDefaults.boxShadow};
      }

      body {
        background-color: var(--kivy-background);
        font-family: var(--kivy-font-family);
        font-size: var(--kivy-font-size);
        color: var(--kivy-text);
      }

      .kivy-widget {
        border-radius: var(--kivy-border-radius);
        padding: var(--kivy-padding);
        margin: var(--kivy-margin);
        box-shadow: var(--kivy-box-shadow);
        font-family: var(--kivy-font-family);
        font-size: var(--kivy-font-size);
        font-weight: var(--kivy-font-weight);
      }

      .kivy-button {
        background-color: var(--kivy-primary);
        color: #fff;
        border: none;
        cursor: pointer;
        transition: all 0.3s;
      }

      .kivy-button:hover {
        background-color: var(--kivy-accent);
      }

      .kivy-slider input[type=range] {
        -webkit-appearance: none;
        appearance: none;
        outline: none;
        cursor: pointer;
        border-radius: var(--kivy-border-radius);
        height: 6px;
      }

      .kivy-slider input[type=range]::-webkit-slider-runnable-track {
        height: 6px;
        border-radius: var(--kivy-border-radius);
      }

      .kivy-slider input[type=range]::-moz-range-track {
        height: 6px;
        border-radius: var(--kivy-border-radius);
      }

      .kivy-progressbar .progressbar-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 20px;
        border-radius: var(--kivy-border-radius);
        overflow: hidden;
        box-sizing: border-box;
      }
    `;
  }

  /** Inject CSS into the document */
  injectCSS() {
    if (this.styleEl) this.styleEl.remove();
    this.styleEl = document.createElement("style");
    this.styleEl.innerText = this.getCSS();
    document.head.appendChild(this.styleEl);
  }

  /** Update color variables dynamically */
  setColors(colors) {
    this.colors = { ...this.colors, ...colors };
    this.injectCSS();
  }

  /** Update typography dynamically */
  setTypography({ fontFamily, fontSize, fontWeight }) {
    if (fontFamily) this.fontFamily = fontFamily;
    if (fontSize) this.fontSize = fontSize;
    if (fontWeight) this.fontWeight = fontWeight;
    this.injectCSS();
  }

  /** Update widget default styles dynamically */
  setWidgetDefaults({ borderRadius, padding, margin, boxShadow }) {
    if (borderRadius) this.widgetDefaults.borderRadius = borderRadius;
    if (padding) this.widgetDefaults.padding = padding;
    if (margin) this.widgetDefaults.margin = margin;
    if (boxShadow) this.widgetDefaults.boxShadow = boxShadow;
    this.injectCSS();
  }
}