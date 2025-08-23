import { Widget } from "../core/widget.js";
import { AccordionStyle } from "../styles/accordionStyle.js";

export class Accordion extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-accordion");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new AccordionStyle().getCSS();
    document.head.appendChild(styleSheet);

    this.items = [];
    if (options.items && Array.isArray(options.items)) {
      options.items.forEach(item => this.addItem(item));
    }

    // Inline styling
    if (options.style) this.style = options.style;
  }

  /** Add an accordion item */
  addItem({ title = "Item", content = null, expanded = false, onExpand, onCollapse }) {
    const item = document.createElement("div");
    item.classList.add("accordion-item");

    const header = document.createElement("div");
    header.classList.add("accordion-header");
    header.textContent = title;

    const body = document.createElement("div");
    body.classList.add("accordion-body");
    if (content) {
      if (typeof content.render === "function") {
        body.appendChild(content.render());
      } else if (content instanceof HTMLElement) {
        body.appendChild(content);
      } else {
        body.textContent = content;
      }
    }

    if (expanded) body.style.display = "block";

    header.addEventListener("click", () => {
      const isExpanded = body.style.display === "block";
      if (isExpanded) {
        body.style.display = "none";
        if (onCollapse) onCollapse();
      } else {
        // Collapse all others
        this.items.forEach(i => i.body.style.display = "none");
        body.style.display = "block";
        if (onExpand) onExpand();
      }
    });

    item.appendChild(header);
    item.appendChild(body);
    this.el.appendChild(item);

    this.items.push({ item, header, body });
  }
}