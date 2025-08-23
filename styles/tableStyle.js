export class TableStyle {
  constructor() {
    this.css = `
      /* Main table styling */
      .kivy-table table {
        width: 100%;
        border-collapse: collapse;
        border: 2px solid #333;
        border-radius: 6px;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }

      /* Table header */
      .kivy-table th {
        background-color: #2196F3;
        color: white;
        padding: 8px;
        text-align: left;
        font-weight: bold;
        border-bottom: 2px solid #333;
      }

      /* Table cells */
      .kivy-table td {
        padding: 8px;
        border: 1px solid #ccc;
        vertical-align: middle;
      }

      /* Striped rows */
      .kivy-table tbody tr:nth-child(odd) {
        background-color: #f2f2f2;
      }

      /* Hover effect */
      .kivy-table tbody tr:hover {
        background-color: #e0e0e0;
      }

      /* Nested tables */
      .kivy-table td table {
        width: 100%;
        border: 1px solid #999;
      }
    `;
  }

  getCSS() {
    return this.css;
  }
}