export class SeparatorStyle {
  constructor() {
    this.css = `
      .kivy-separator {
        display: block;
        background: none;
      }

      /* Horizontal separator */
      .kivy-separator.horizontal {
        width: 100%;
        height: 1px;
        border-bottom: 1px solid var(--kivy-text);
        margin: 8px 0;
      }

      /* Vertical separator */
      .kivy-separator.vertical {
        width: 1px;
        height: 100%;
        border-left: 1px solid var(--kivy-text);
        margin: 0 8px;
      }
    `;
  }

  /** Inject separator CSS into document */
  inject() {
    const styleEl = document.createElement("style");
    styleEl.innerText = this.css;
    document.head.appendChild(styleEl);
  }
}