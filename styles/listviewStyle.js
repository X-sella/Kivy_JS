export class ListViewStyle {
  constructor() {
    this.css = `
      .kivy-listview .listview-container {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 300px;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-family: Arial, sans-serif;
        box-sizing: border-box;
      }

      .kivy-listview .listview-item {
        padding: 8px 12px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        transition: background-color 0.2s;
      }

      .kivy-listview .listview-item:hover {
        background-color: #f0f0f0;
      }
    `;
  }

  getCSS() { return this.css; }
}