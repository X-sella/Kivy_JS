export class RecycleViewStyle {
  constructor() {
    this.css = `
      .kivy-recycleview {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: var(--kivy-border-radius);
        overflow: hidden;
        background-color: var(--kivy-background);
      }

      .kivy-recycleview > div {
        overflow-y: auto;
        max-height: 300px; /* default scroll height */
      }

      .kivy-recycleview div > div {
        padding: var(--kivy-padding);
        border-bottom: 1px solid #ddd;
        font-family: var(--kivy-font-family);
        font-size: var(--kivy-font-size);
        cursor: pointer;
        transition: background 0.2s;
      }

      .kivy-recycleview div > div:hover {
        background-color: #f0f0f0;
      }

      .kivy-recycleview div > div:last-child {
        border-bottom: none;
      }
    `;
  }

  /** Inject RecycleView CSS into the document */
  inject() {
    const styleEl = document.createElement("style");
    styleEl.innerText = this.css;
    document.head.appendChild(styleEl);
  }
}