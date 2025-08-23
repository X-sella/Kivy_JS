export class ButtonStyle {
  constructor() {
    this.css = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

      .kivy-button {
        display: inline-block;
        font-family: 'Roboto', Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        color: #fff;
        background-color: #2196F3;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        user-select: none;
      }

      .kivy-button:hover {
        background-color: #1976D2;
      }

      .kivy-button:active {
        background-color: #0D47A1;
      }
    `;
  }

  getCSS() { return this.css; }
}