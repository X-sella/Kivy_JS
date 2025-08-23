export class PopupStyle {
  constructor() {
    this.css = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

      .popup-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Roboto', Arial, sans-serif;
        z-index: 1000;
      }

      .popup-overlay-background {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.5);
      }

      .popup-box {
        position: relative;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        min-width: 300px;
        max-width: 90%;
        z-index: 1001;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .popup-title {
        font-size: 18px;
        font-weight: bold;
      }

      .popup-close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
      }

      .popup-content {
        margin-top: 10px;
      }
    `;
  }

  getCSS() { return this.css; }
}