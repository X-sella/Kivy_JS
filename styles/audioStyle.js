export class AudioStyle {
  constructor() {
    this.css = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

      .audio-container {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: 'Roboto', Arial, sans-serif;
        background-color: #fafafa;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 300px;
      }

      .audio-play-btn {
        cursor: pointer;
        background: none;
        border: none;
        font-size: 16px;
      }

      .audio-progress {
        flex: 1;
        height: 6px;
        background-color: #ddd;
        border-radius: 3px;
        overflow: hidden;
        cursor: pointer;
      }

      .audio-progress-inner {
        height: 100%;
        width: 0;
        background-color: #007bff;
      }

      .audio-time {
        font-size: 12px;
        color: #333;
        min-width: 50px;
        text-align: right;
      }

      .audio-volume {
        width: 70px;
      }
    `;
  }

  getCSS() { return this.css; }
}