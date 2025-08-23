import { Widget } from "../core/widget.js";

export class RecycleView extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-recycleview");

    // Data for list items
    this.data = options.data || [];
    // Item renderer: function that returns a DOM element
    this.itemRenderer = options.itemRenderer || ((item) => {
      const div = document.createElement("div");
      div.innerText = item.toString();
      div.style.padding = "8px";
      div.style.borderBottom = "1px solid #ccc";
      return div;
    });

    // Scroll container
    this.scrollEl = document.createElement("div");
    this.scrollEl.style.overflowY = "auto";
    this.scrollEl.style.maxHeight = options.maxHeight || "300px";
    this.scrollEl.style.width = "100%";
    this.scrollEl.style.boxSizing = "border-box";

    this.el.appendChild(this.scrollEl);

    // Styles
    if (options.style) this.el.style.cssText = options.style;

    this.renderData();
  }

  /** Render all items */
  renderData() {
    this.scrollEl.innerHTML = "";
    this.data.forEach((item, index) => {
      const itemEl = this.itemRenderer(item, index);
      this.scrollEl.appendChild(itemEl);
    });
  }

  /** Update data dynamically */
  setData(newData) {
    this.data = newData;
    this.renderData();
  }

  /** Append a new item */
  append(item) {
    this.data.push(item);
    const itemEl = this.itemRenderer(item, this.data.length - 1);
    this.scrollEl.appendChild(itemEl);
  }

  /** Render RecycleView */
  render() {
    return this.el;
  }
}