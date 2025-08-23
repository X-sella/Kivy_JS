export class LabelStyle {
  constructor() {
    this.css = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

      .label-container {
        font-family: 'Roboto', Arial, sans-serif;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        color: #000;
        text-decoration: none;
        text-transform: none;
        letter-spacing: normal;
        line-height: 1.5;
        text-align: left;
        text-shadow: none;

        margin: 0;
        padding: 0;
        display: inline-block;
        box-sizing: border-box;
      }
    `;
  }

  getCSS() {
    return this.css;
  }
}