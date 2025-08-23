import { Widget } from "../core/widget.js";
import { ListViewStyle } from "../styles/listViewStyle.js";

export class ListView extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-listview");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new ListViewStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Container for list items
    this.listEl = document.createElement("ul");
    this.listEl.classList.add("listview-container");
    this.addChild(this.listEl);

    this.items = [];
    this.onSelect = options.onSelect || null;

    if (options.items) {
      options.items.forEach(item => this.addItem(item));
    }

    // Inline styling
    if (options.style) this.style = options.style;
  }

  /** Add an item to the list */
  addItem(content) {
    const li = document.createElement("li");
    li.classList.add("listview-item");

    if (typeof content === "string") {
      li.textContent = content;
    } else if (content instanceof Widget) {
      li.appendChild(content.render());
    } else if (content instanceof HTMLElement) {
      li.appendChild(content);
    }

    li.addEventListener("click", () => {
      if (this.onSelect) this.onSelect(content);
    });

    this.listEl.appendChild(li);
    this.items.push(li);
  }

  /** Remove item by index */
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      const li = this.items[index];
      this.listEl.removeChild(li);
      this.items.splice(index, 1);
    }
  }

  /** Clear all items */
  clear() {
    this.listEl.innerHTML = "";
    this.items = [];
  }

  /** Get current items */
  getItems() {
    return this.items.map(li => li.textContent);
  }
}