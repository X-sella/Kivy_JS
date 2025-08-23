import { Widget } from "../core/widget.js";

export class Spinner extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-spinner");

    this.options = options.options || [];
    this.text = options.text || (this.options[0] || "Select");
    this.style = options.style || "";
    this.onSelect = options.onSelect || null;

    this.el.style.position = "relative";
    this.el.style.display = "inline-block";
    this.el.style.cursor = "pointer";
    if (this.style) this.el.style.cssText += this.style;

    this.el.innerText = this.text;

    this.dropdownEl = document.createElement("div");
    this.dropdownEl.classList.add("spinner-dropdown");
    this.dropdownEl.style.position = "absolute";
    this.dropdownEl.style.top = "100%";
    this.dropdownEl.style.left = "0";
    this.dropdownEl.style.background = "#fff";
    this.dropdownEl.style.border = "1px solid #ccc";
    this.dropdownEl.style.borderRadius = "6px";
    this.dropdownEl.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
    this.dropdownEl.style.display = "none";
    this.dropdownEl.style.zIndex = "1000";
    this.dropdownEl.style.minWidth = "100%";

    this.options.forEach(opt => {
      const optEl = document.createElement("div");
      optEl.innerText = opt;
      optEl.style.padding = "8px 12px";
      optEl.style.cursor = "pointer";
      optEl.addEventListener("click", () => {
        this.text = opt;
        this.el.innerText = opt;
        this.dropdownEl.style.display = "none";
        if (this.onSelect) this.onSelect(opt);
      });
      optEl.addEventListener("mouseover", () => optEl.style.backgroundColor = "#f0f0f0");
      optEl.addEventListener("mouseout", () => optEl.style.backgroundColor = "#fff");
      this.dropdownEl.appendChild(optEl);
    });

    this.el.appendChild(this.dropdownEl);

    // Toggle dropdown on click
    this.el.addEventListener("click", (e) => {
      e.stopPropagation();
      this.dropdownEl.style.display = this.dropdownEl.style.display === "none" ? "block" : "none";
    });

    // Close dropdown if clicked outside
    document.addEventListener("click", () => {
      this.dropdownEl.style.display = "none";
    });
  }

  /** Add a new option dynamically */
  addOption(option) {
    this.options.push(option);
    const optEl = document.createElement("div");
    optEl.innerText = option;
    optEl.style.padding = "8px 12px";
    optEl.style.cursor = "pointer";
    optEl.addEventListener("click", () => {
      this.text = option;
      this.el.innerText = option;
      this.dropdownEl.style.display = "none";
      if (this.onSelect) this.onSelect(option);
    });
    optEl.addEventListener("mouseover", () => optEl.style.backgroundColor = "#f0f0f0");
    optEl.addEventListener("mouseout", () => optEl.style.backgroundColor = "#fff");
    this.dropdownEl.appendChild(optEl);
  }

  /** Render the spinner */
  render() {
    return this.el;
  }
}