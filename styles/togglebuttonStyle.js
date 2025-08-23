export class ToggleButtonStyle {
  constructor() {
    this.css = `
      .kivy-toggle-button {
        display: inline-block;
        background-color: var(--kivy-secondary);
        color: #fff;
        border: none;
        border-radius: var(--kivy-border-radius);
        padding: var(--kivy-padding) 16px;
        margin: var(--kivy-margin);
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: var(--kivy-font-family);
        font-size: var(--kivy-font-size);
        user-select: none;
        text-align: center;
      }

      .kivy-toggle-button:hover {
        filter: brightness(1.1);
      }

      .kivy-toggle-button:active {
        transform: scale(0.98);
      }

      .kivy-toggle-button[data-active='true'] {
        background-color: var(--kivy-primary);
      }

      /* Grouped toggle buttons spacing */
      .kivy-toggle-button[data-group] {
        margin-right: 4px;
      }
    `;
  }

  /** Inject CSS into document */
  inject() {
    const styleEl = document.createElement("style");
    styleEl.innerText = this.css;
    document.head.appendChild(styleEl);
  }
}