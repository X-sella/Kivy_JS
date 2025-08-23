export class CheckboxStyle {
  constructor() {
    this.css = `
      .kivy-checkbox .checkbox-container {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-family: Arial, sans-serif;
      }

      .kivy-checkbox .checkbox-input {
        width: 16px;
        height: 16px;
        margin-right: 8px;
        cursor: pointer;
      }

      .kivy-checkbox .checkbox-label {
        font-size: 14px;
        user-select: none;
      }
    `;
  }

  getCSS() { return this.css; }
}