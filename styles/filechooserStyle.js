export class FileChooserStyle {
  constructor() {
    this.css = `
      .kivy-filechooser .filechooser-input,
      .kivy-filechooser .filechooser-url {
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        background-color: #f0f0f0;
        margin-right: 5px;
      }

      .kivy-filechooser .filechooser-input:hover,
      .kivy-filechooser .filechooser-url:hover {
        background-color: #e0e0e0;
      }

      .kivy-filechooser .filechooser-loadbtn {
        padding: 6px 12px;
        font-family: Arial, sans-serif;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f0f0f0;
        margin-right: 5px;
      }

      .kivy-filechooser .filechooser-loadbtn:hover {
        background-color: #e0e0e0;
      }

      .kivy-filechooser .filechooser-drop {
        margin-top: 10px;
        padding: 20px;
        border: 2px dashed #aaa;
        border-radius: 6px;
        text-align: center;
        font-family: Arial, sans-serif;
        color: #555;
        transition: background-color 0.3s, border-color 0.3s;
      }

      .kivy-filechooser .filechooser-drop.dragover {
        background-color: #f9f9f9;
        border-color: #777;
      }
    `;
  }

  getCSS() { return this.css; }
}