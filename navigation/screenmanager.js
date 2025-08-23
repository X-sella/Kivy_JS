import { Widget } from "../core/widget.js";

export class ScreenManager extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-screenmanager");
    this.screens = {}; // {name: widget}
    this.current = null;
    this.transitionDuration = options.transitionDuration || 300; // ms
  }

  /** Add a screen with a unique name */
  addScreen(name, screenWidget) {
    if (!screenWidget || !screenWidget.render) return;
    const el = screenWidget.render();
    el.style.position = "absolute";
    el.style.top = "0";
    el.style.left = "0";
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.transition = `opacity ${this.transitionDuration}ms ease`;
    el.style.opacity = 0;
    el.style.pointerEvents = "none";

    this.el.appendChild(el);
    this.screens[name] = el;

    // Show first screen by default
    if (!this.current) this.showScreen(name);
  }

  /** Show a screen by name */
  showScreen(name) {
    if (!this.screens[name]) return;

    if (this.current) {
      const currentEl = this.screens[this.current];
      currentEl.style.opacity = 0;
      currentEl.style.pointerEvents = "none";
    }

    const nextEl = this.screens[name];
    nextEl.style.opacity = 1;
    nextEl.style.pointerEvents = "auto";

    this.current = name;
  }

  /** Remove a screen */
  removeScreen(name) {
    if (!this.screens[name]) return;
    this.el.removeChild(this.screens[name]);
    delete this.screens[name];
    if (this.current === name) this.current = null;
  }

  render() {
    this.el.style.position = "relative";
    this.el.style.overflow = "hidden";
    return this.el;
  }
}