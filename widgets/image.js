import { Widget } from "../core/widget.js";
import { ImageStyle } from "../styles/imageStyle.js";

export class Image extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-image");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new ImageStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Image element
    this.img = document.createElement("img");
    this.img.src = options.src || "";
    this.img.alt = options.alt || "";
    this.img.style.width = options.width || "auto";
    this.img.style.height = options.height || "auto";
    this.img.style.objectFit = options.stretch || "contain"; // contain, cover, fill
    this.addChild(this.img);

    // Inline styles
    if (options.style) this.style = options.style;

    // Events
    if (options.onLoad) this.img.addEventListener("load", options.onLoad);
    if (options.onError) this.img.addEventListener("error", options.onError);
  }

  /** Change image source */
  setSource(src) {
    this.img.src = src;
  }

  /** Get current image source */
  getSource() {
    return this.img.src;
  }
}