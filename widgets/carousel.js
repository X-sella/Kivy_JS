import { Widget } from "../core/widget.js";
import { CarouselStyle } from "../styles/carouselStyle.js";

export class Carousel extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-carousel");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new CarouselStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Container for slides
    this.slidesContainer = document.createElement("div");
    this.slidesContainer.classList.add("carousel-slides");

    // Add initial slides if any
    this.slides = [];
    this.currentIndex = 0;
    if (options.slides && Array.isArray(options.slides)) {
      options.slides.forEach(slide => this.addSlide(slide));
    }

    // Navigation buttons
    this.prevBtn = document.createElement("button");
    this.prevBtn.classList.add("carousel-prev");
    this.prevBtn.textContent = "◀";
    this.nextBtn = document.createElement("button");
    this.nextBtn.classList.add("carousel-next");
    this.nextBtn.textContent = "▶";

    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    // Assemble carousel
    this.el.appendChild(this.prevBtn);
    this.el.appendChild(this.slidesContainer);
    this.el.appendChild(this.nextBtn);

    // Inline styling
    if (options.style) this.style = options.style;

    // Slide change event
    this.onSlideChange = options.onSlideChange || null;
    this.updateSlides();
  }

  /** Add a slide */
  addSlide(content) {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");
    if (typeof content.render === "function") {
      slide.appendChild(content.render());
    } else if (content instanceof HTMLElement) {
      slide.appendChild(content);
    } else {
      slide.textContent = content;
    }
    this.slides.push(slide);
    this.slidesContainer.appendChild(slide);
    this.updateSlides();
  }

  /** Show current slide */
  updateSlides() {
    this.slides.forEach((s, i) => {
      s.style.display = i === this.currentIndex ? "block" : "none";
    });
    if (this.onSlideChange) this.onSlideChange(this.currentIndex);
  }

  /** Go to next slide */
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlides();
  }

  /** Go to previous slide */
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
  }

  /** Go to a specific slide */
  goTo(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex = index;
      this.updateSlides();
    }
  }
}