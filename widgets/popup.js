import { Widget } from "../core/widget.js";
import { PopupStyle } from "../styles/popupStyle.js";

export class Popup extends Widget {
  constructor(options = {}) {
    super();

    // Container style
    this.el.classList.add("popup-overlay");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new PopupStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Overlay to block background
    this.overlay = document.createElement("div");
    this.overlay.classList.add("popup-overlay-background");

    // Popup box
    this.box = document.createElement("div");
    this.box.classList.add("popup-box");

    // Title
    this.titleEl = document.createElement("div");
    this.titleEl.classList.add("popup-title");
    this.titleEl.textContent = options.title || "Popup";

    // Close button
    this.closeBtn = document.createElement("button");
    this.closeBtn.classList.add("popup-close-btn");
    this.closeBtn.textContent = "×";

    // Content container
    this.contentEl = document.createElement("div");
    this.contentEl.classList.add("popup-content");
    if (options.content instanceof Widget) {
      this.contentEl.appendChild(options.content.render());
    } else if (typeof options.content === "string") {
      this.contentEl.innerHTML = options.content;
    }

    // Assemble
    this.box.appendChild(this.titleEl);
    this.box.appendChild(this.closeBtn);
    this.box.appendChild(this.contentEl);
    this.el.appendChild(this.overlay);
    this.el.appendChild(this.box);

    // Inline styles
    if (options.style) this.style = options.style;

    // Event handlers
    this.closeBtn.addEventListener("click", () => this.close());
    if (options.onClose) this.onClose = options.onClose;
    if (options.onOpen) this.onOpen = options.onOpen;

    // Hide by default
    this.el.style.display = "none";
  }

  /** Open the popup */
  open() {
    this.el.style.display = "block";
    if (this.onOpen) this.onOpen();
  }

  /** Close the popup */
  close() {
    this.el.style.display = "none";
    if (this.onClose) this.onClose();
  }

  /** Set content dynamically */
  setContent(content) {
    this.contentEl.innerHTML = "";
    if (content instanceof Widget) {
      this.contentEl.appendChild(content.render());
    } else if (typeof content === "string") {
      this.contentEl.innerHTML = content;
    }
  }

  /** Set title */
  setTitle(title) {
    this.titleEl.textContent = title;
  }
}