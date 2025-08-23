export class HoverBehavior {
  constructor(widget, options = {}) {
    this.widget = widget;
    this.options = Object.assign({
      onEnter: () => {},
      onLeave: () => {},
      hoverClass: '',     // optional CSS class added when hovering
      hoverStyle: {}      // optional inline style changes
    }, options);

    this._hovering = false;
    this.init();
  }

  init() {
    const el = this.widget.el;

    el.addEventListener('mouseenter', e => this.enter(e));
    el.addEventListener('mouseleave', e => this.leave(e));
  }

  enter(event) {
    if (this._hovering) return;
    this._hovering = true;

    // Apply hover class if specified
    if (this.options.hoverClass) {
      this.widget.el.classList.add(this.options.hoverClass);
    }

    // Apply inline hover styles if specified
    if (this.options.hoverStyle) {
      Object.entries(this.options.hoverStyle).forEach(([k, v]) => {
        this.widget.el.style[k] = v;
      });
    }

    this.options.onEnter(event);
  }

  leave(event) {
    if (!this._hovering) return;
    this._hovering = false;

    if (this.options.hoverClass) {
      this.widget.el.classList.remove(this.options.hoverClass);
    }

    // Remove hover styles
    if (this.options.hoverStyle) {
      Object.entries(this.options.hoverStyle).forEach(([k, _]) => {
        this.widget.el.style[k] = '';
      });
    }

    this.options.onLeave(event);
  }

  isHovering() {
    return this._hovering;
  }
}