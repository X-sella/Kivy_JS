import { Widget } from "../core/widget.js";
import { LayoutStyle } from "../styles/layoutStyle.js";

// Ensure layout CSS is injected once
if (!document.getElementById("kivy-layout-style")) {
  new LayoutStyle().inject();
  const styleEl = document.querySelector("style:last-of-type");
  styleEl.id = "kivy-layout-style";
}

export class ScatterLayout extends Widget {
  constructor(options = {}) {
    super();
    this.el.classList.add("kivy-scatterlayout");

    if (options.style) this.el.style.cssText += options.style;

    this.el.style.position = "relative";

    // Track children transforms
    this.childrenTransforms = new WeakMap();
  }

  /** Add child widget */
  addWidget(widget) {
    if (!widget || !widget.render) return;
    const el = widget.render();
    el.style.position = "absolute";
    el.style.transformOrigin = "center center";

    // Initialize transform state
    this.childrenTransforms.set(el, { x: 0, y: 0, scale: 1, rotation: 0 });

    // Make draggable, scalable, and rotatable
    this.enableTransform(el);

    this.el.appendChild(el);
  }

  enableTransform(el) {
    let isDragging = false;
    let startX, startY;

    // Mouse drag for translation
    el.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX - this.childrenTransforms.get(el).x;
      startY = e.clientY - this.childrenTransforms.get(el).y;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const transform = this.childrenTransforms.get(el);
      transform.x = e.clientX - startX;
      transform.y = e.clientY - startY;
      el.style.transform = `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotation}deg) scale(${transform.scale})`;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Wheel for scaling
    el.addEventListener("wheel", (e) => {
      e.preventDefault();
      const transform = this.childrenTransforms.get(el);
      transform.scale += e.deltaY * -0.001;
      transform.scale = Math.max(0.1, transform.scale);
      el.style.transform = `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotation}deg) scale(${transform.scale})`;
    });

    // Rotate with right mouse button drag
    el.addEventListener("contextmenu", (e) => e.preventDefault()); // prevent context menu
    let isRotating = false;
    let rotateStartX;
    el.addEventListener("mousedown", (e) => {
      if (e.button === 2) { // right button
        isRotating = true;
        rotateStartX = e.clientX;
      }
    });
    document.addEventListener("mousemove", (e) => {
      if (!isRotating) return;
      const transform = this.childrenTransforms.get(el);
      transform.rotation += e.clientX - rotateStartX;
      rotateStartX = e.clientX;
      el.style.transform = `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotation}deg) scale(${transform.scale})`;
    });
    document.addEventListener("mouseup", () => {
      isRotating = false;
    });
  }

  render() {
    return this.el;
  }
}