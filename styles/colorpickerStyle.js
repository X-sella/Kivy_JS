export class ColorPickerStyle {
  constructor() {
    this.css = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

      .colorpicker-container {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Roboto', Arial, sans-serif;
        background-color: #fafafa;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px 10px;
        box-sizing: border-box;
      }

      .colorpicker-preview {
        width: 40px;
        height: 40px;
        border: 1px solid #aaa;
        border-radius: 3px;
      }

      .colorpicker-hex {
        width: 70px;
        padding: 2px 5px;
        font-size: 12px;
        text-align: center;
      }

      .colorpicker-slider-r,
      .colorpicker-slider-g,
      .colorpicker-slider-b {
        width: 80px;
      }
    `;
  }

  getCSS() { return this.css; }
}