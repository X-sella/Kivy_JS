export class StencilViewBehavior {
  constructor(widget) {
    this.widget = widget;
    this.init();
  }

  init() {
    const el = this.widget.el;
    
    // Apply clipping using CSS
    el.style.overflow = 'hidden';
    el.style.position = el.style.position || 'relative';

    // Optional: if you want rounded clipping
    // el.style.borderRadius = '10px';

    // Ensure all children stay inside boundaries
    const observer = new MutationObserver(() => {
      for (let child of el.children) {
        if (child !== this.stencilOverlay) {
          child.style.position = child.style.position || 'absolute';
        }
      }
    });
    observer.observe(el, { childList: true, subtree: true });

    this.observer = observer;
  }

  // Optional: dynamically update clip on resize
  update() {
    const el = this.widget.el;
    const rect = el.getBoundingClientRect();
    el.style.width = `${rect.width}px`;
    el.style.height = `${rect.height}px`;
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
  }
}