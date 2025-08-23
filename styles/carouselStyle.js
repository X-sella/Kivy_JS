export class CarouselStyle {
  constructor() {
    this.css = `
      .kivy-carousel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 500px;
        height: 300px;
        position: relative;
        overflow: hidden;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-sizing: border-box;
        background-color: #fafafa;
      }

      .carousel-slides {
        flex: 1;
        height: 100%;
        overflow: hidden;
        position: relative;
      }

      .carousel-slide {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transition: opacity 0.5s ease;
      }

      .carousel-prev,
      .carousel-next {
        background-color: rgba(0,0,0,0.4);
        border: none;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .carousel-prev:hover,
      .carousel-next:hover {
        background-color: rgba(0,0,0,0.6);
      }
    `;
  }

  getCSS() { return this.css; }
}