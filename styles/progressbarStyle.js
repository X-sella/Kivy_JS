export class ProgressBarStyle {
  constructor() {
    this.css = `
      .kivy-progressbar .progressbar-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 20px;
        border-radius: 6px;
        overflow: hidden;
        box-sizing: border-box;
      }

      .kivy-progressbar.vertical .progressbar-container {
        flex-direction: column;
        width: 20px;
        height: 100%;
      }

      .kivy-progressbar .progressbar-block {
        flex: 1;
        background-color: #ddd;
        transition: background-color 0.3s;
      }

      @keyframes progressbar-stripes {
        0% { background-position: 0 0; }
        100% { background-position: 40px 0; }
      }
    `;
  }

  getCSS() { return this.css; }
}