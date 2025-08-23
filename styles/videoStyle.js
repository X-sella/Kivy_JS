export class VideoStyle {
  constructor() {
    this.css = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

      .kivy-video {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        font-family: 'Roboto', Arial, sans-serif;
        border-radius: 6px;
        overflow: hidden;
        background-color: #fafafa;
        border: 1px solid #ccc;
        width: 480px;
        box-sizing: border-box;
        padding: 5px;
      }

      .video-controls {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
      }

      .video-play-btn {
        cursor: pointer;
        font-size: 16px;
        border: none;
        background: none;
      }

      .video-progress {
        flex: 1;
        height: 6px;
        background-color: #ddd;
        border-radius: 3px;
        overflow: hidden;
        cursor: pointer;
      }

      .video-progress-inner {
        height: 100%;
        width: 0;
        background-color: #007bff;
      }

      .video-time {
        font-size: 12px;
      }

      .video-volume {
        width: 100px;
      }
    `;
  }

  getCSS() { return this.css; }
}