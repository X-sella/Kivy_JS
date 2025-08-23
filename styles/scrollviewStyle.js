export class ScrollViewStyle {
  constructor() {
    this.css = `
      .kivy-scrollview {
        width: 100%;
        height: 200px;
        overflow: auto;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fafafa;
        box-sizing: border-box;
        padding: 5px;
      }

      .scrollview-content {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
      }
    `;
  }

  getCSS() { return this.css; }
}