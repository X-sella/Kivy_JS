export class TextInputStyle {
  constructor() {
    this.css = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

      .kivy-textinput input,
      .kivy-textinput textarea {
        font-family: 'Roboto', Arial, sans-serif;
        font-size: 14px;
        padding: 6px 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        box-sizing: border-box;
        width: 100%;
        resize: vertical;
      }

      .kivy-textinput input:focus,
      .kivy-textinput textarea:focus {
        border-color: #2196F3;
        box-shadow: 0 0 3px #2196F3;
      }
    `;
  }

  getCSS() { return this.css; }
}