import { Widget } from "../core/widget.js";
import { DropdownStyle } from "../styles/dropdownStyle.js";

export class DropDown extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-dropdown");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new DropdownStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Trigger button
    this.button = document.createElement("button");
    this.button.textContent = options.buttonText || "Select";
    this.button.classList.add("dropdown-btn");

    // Menu container
    this.menu = document.createElement("div");
    this.menu.classList.add("dropdown-menu");

    // Add options
    this.options = options.options || [];
    this.options.forEach(opt => this.addOption(opt));

    // Toggle menu visibility
    this.button.addEventListener("click", () => {
      this.menu.style.display = this.menu.style.display === "block" ? "none" : "block";
    });

    // Hide menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.el.contains(e.target)) {
        this.menu.style.display = "none";
      }
    });

    this.el.appendChild(this.button);
    this.el.appendChild(this.menu);

    // Inline styling
    if (options.style) this.style = options.style;

    // Event callback
    this.onSelect = options.onSelect || null;
  }

  /** Add a new option */
  addOption(option) {
    const optEl = document.createElement("div");
    optEl.classList.add("dropdown-item");

    if (typeof option === "string") {
      optEl.textContent = option;
    } else if (option instanceof HTMLElement) {
      optEl.appendChild(option);
    } else if (option.text) {
      optEl.textContent = option.text;
    }

    optEl.addEventListener("click", () => {
      this.button.textContent = optEl.textContent;
      this.menu.style.display = "none";
      if (this.onSelect) this.onSelect(optEl.textContent);
    });

    this.menu.appendChild(optEl);
  }
}