export class WebViewStyle {
  constructor() {
    this.css = `
      .kivy-webview {
        width: 100%;
        height: 300px;
        overflow: hidden;
        border-radius: 6px;
        box-sizing: border-box;
        background-color: #fafafa;
        border: 1px solid #ccc;
      }

      .kivy-webview iframe {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 6px;
      }
    `;
  }

  getCSS() { return this.css; }
}