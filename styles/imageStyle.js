export class ImageStyle {
  constructor() {
    this.css = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

      .kivy-image {
        display: inline-block;
        border-radius: 4px;
        overflow: hidden;
        box-sizing: border-box;
      }

      .kivy-image img {
        display: block;
        max-width: 100%;
        max-height: 100%;
      }
    `;
  }

  getCSS() { return this.css; }
}