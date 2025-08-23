export class AccordionStyle {
  constructor() {
    this.css = `
      .kivy-accordion {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
      }

      .kivy-accordion .accordion-item {
        border-bottom: 1px solid #ddd;
      }

      .kivy-accordion .accordion-item:last-child {
        border-bottom: none;
      }

      .kivy-accordion .accordion-header {
        background-color: #f0f0f0;
        padding: 10px 15px;
        cursor: pointer;
        user-select: none;
        font-weight: bold;
        transition: background 0.3s;
      }

      .kivy-accordion .accordion-header:hover {
        background-color: #e0e0e0;
      }

      .kivy-accordion .accordion-body {
        padding: 10px 15px;
        display: none;
        background-color: #fafafa;
      }
    `;
  }

  getCSS() { return this.css; }
}