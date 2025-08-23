import { Widget } from "../core/widget.js";
import { ScrollViewStyle } from "../styles/scrollviewStyle.js";

export class ScrollView extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-scrollview");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new ScrollViewStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Content container
    this.content = document.createElement("div");
    this.content.classList.add("scrollview-content");

    // Add initial children if any
    if (options.children && Array.isArray(options.children)) {
      options.children.forEach(child => {
        if (typeof child.render === "function") {
          this.content.appendChild(child.render());
        } else if (child instanceof HTMLElement) {
          this.content.appendChild(child);
        }
      });
    }

    this.addChild(this.content);

    // Scroll direction
    this.el.style.overflowX = options.horizontal ? "auto" : "hidden";
    this.el.style.overflowY = options.vertical !== false ? "auto" : "hidden";

    // Inline styling
    if (options.style) this.style = options.style;

    // Scroll event
    if (options.onScroll) this.el.addEventListener("scroll", options.onScroll);
  }

  /** Add a child widget */
  addChildWidget(widget) {
    if (typeof widget.render === "function") {
      this.content.appendChild(widget.render());
    } else if (widget instanceof HTMLElement) {
      this.content.appendChild(widget);
    }
  }

  /** Remove a child widget */
  removeChildWidget(widget) {
    if (typeof widget.render === "function") {
      this.content.removeChild(widget.render());
    } else if (widget instanceof HTMLElement) {
      this.content.removeChild(widget);
    }
  }

  /** Scroll to top */
  scrollToTop() {
    this.el.scrollTop = 0;
  }

  /** Scroll to bottom */
  scrollToBottom() {
    this.el.scrollTop = this.el.scrollHeight;
  }
}