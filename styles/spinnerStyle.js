export class SpinnerStyle {
  constructor() {
    this.css = `
      .kivy-spinner {
        display: inline-block;
        padding: var(--kivy-padding) 16px;
        border-radius: var(--kivy-border-radius);
        background-color: var(--kivy-secondary);
        color: #fff;
        cursor: pointer;
        user-select: none;
        font-family: var(--kivy-font-family);
        font-size: var(--kivy-font-size);
        transition: all 0.3s ease;
        position: relative;
      }

      .kivy-spinner:hover {
        filter: brightness(1.1);
      }

      .kivy-spinner:active {
        transform: scale(0.98);
      }

      .kivy-spinner .spinner-dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: var(--kivy-border-radius);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        min-width: 100%;
        z-index: 1000;
      }

      .kivy-spinner .spinner-dropdown div {
        padding: 8px 12px;
        cursor: pointer;
        transition: background 0.2s;
      }

      .kivy-spinner .spinner-dropdown div:hover {
        background-color: #f0f0f0;
      }
    `;
  }

  /** Inject spinner CSS into document */
  inject() {
    const styleEl = document.createElement("style");
    styleEl.innerText = this.css;
    document.head.appendChild(styleEl);
  }
}