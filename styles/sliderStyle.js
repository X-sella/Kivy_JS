export class SliderStyle {
  constructor() {
    this.css = `
      .kivy-slider input[type=range] {
        -webkit-appearance: none;
        appearance: none;
        outline: none;
        cursor: pointer;
        border-radius: 6px;
        height: 6px;
      }

      .kivy-slider input[type=range]::-webkit-slider-runnable-track {
        height: 6px;
        border-radius: 6px;
      }

      .kivy-slider input[type=range]::-moz-range-track {
        height: 6px;
        border-radius: 6px;
      }
    `;
  }

  getCSS() { return this.css; }
}