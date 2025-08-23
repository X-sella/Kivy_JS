import { Widget } from "../core/widget.js";

export class ToggleButton extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-toggle-button");

    // State
    this.active = options.active || false;
    this.group = options.group || null;

    // Styles
    this.style = options.style || "";
    this.activeColor = options.activeColor || "var(--kivy-primary)";
    this.inactiveColor = options.inactiveColor || "var(--kivy-secondary)";
    this.text = options.text || "Toggle";

    // Events
    this.onToggle = options.onToggle || null;

    this.el.innerText = this.text;
    if (this.style) this.el.style.cssText = this.style;

    // Initialize
    this.updateState();

    this.el.addEventListener("click", () => this.toggle());
  }

  /** Toggle the button state */
  toggle() {
    if (this.group) {
      // deactivate other buttons in the same group
      document.querySelectorAll(`.kivy-toggle-button[data-group='${this.group}']`).forEach(btn => {
        if (btn !== this.el) btn.dataset.active = "false";
        btn.style.backgroundColor = btn.dataset.active === "true" ? this.activeColor : this.inactiveColor;
      });
      this.active = true;
    } else {
      this.active = !this.active;
    }
    this.updateState();
    if (this.onToggle) this.onToggle(this.active);
  }

  /** Update the visual state */
  updateState() {
    this.el.dataset.active = this.active ? "true" : "false";
    this.el.style.backgroundColor = this.active ? this.activeColor : this.inactiveColor;
    this.el.style.color = "#fff";
    this.el.style.cursor = "pointer";
    this.el.style.borderRadius = "6px";
    this.el.style.padding = "8px 16px";
    this.el.style.userSelect = "none";

    if (this.group) this.el.dataset.group = this.group;
  }

  /** Render the button */
  render() {
    return this.el;
  }
}