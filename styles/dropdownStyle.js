export class DropdownStyle {
  constructor() {
    this.css = `
      .kivy-dropdown {
        position: relative;
        display: inline-block;
        font-family: Arial, sans-serif;
      }

      .kivy-dropdown .dropdown-btn {
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f0f0f0;
        cursor: pointer;
      }

      .kivy-dropdown .dropdown-btn:hover {
        background-color: #e0e0e0;
      }

      .kivy-dropdown .dropdown-menu {
        display: none;
        position: absolute;
        background-color: #fff;
        min-width: 160px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        border: 1px solid #ccc;
        border-radius: 4px;
        z-index: 1000;
        box-sizing: border-box;
      }

      .kivy-dropdown .dropdown-item {
        padding: 8px 12px;
        cursor: pointer;
      }

      .kivy-dropdown .dropdown-item:hover {
        background-color: #f0f0f0;
      }
    `;
  }

  getCSS() { return this.css; }
}