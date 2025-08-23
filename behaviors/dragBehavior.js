export class DragBehavior {
  constructor(widget, options = {}) {
    this.widget = widget;
    this.options = Object.assign({
      bounds: null,          // {xMin, xMax, yMin, yMax} or null for free drag
      inertia: true,
      deceleration: 0.9,
      axis: 'both',          // 'x', 'y', 'both'
    }, options);

    this.pos = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.dragging = false;
    this.activeTouches = {};
    this.init();
  }

  init() {
    const el = this.widget.el;
    el.style.position = el.style.position || 'absolute';
    el.style.cursor = 'grab';

    // Mouse Events
    el.addEventListener('mousedown', e => this.startDrag(e.clientX, e.clientY));
    document.addEventListener('mousemove', e => this.drag(e.clientX, e.clientY));
    document.addEventListener('mouseup', () => this.endDrag());

    // Touch Events (multitouch-friendly)
    el.addEventListener('touchstart', e => {
      for (let t of e.changedTouches) this.startTouch(t);
    }, { passive: false });

    el.addEventListener('touchmove', e => {
      for (let t of e.changedTouches) this.dragTouch(t);
    }, { passive: false });

    el.addEventListener('touchend', e => {
      for (let t of e.changedTouches) this.endTouch(t);
    });

    el.addEventListener('touchcancel', e => {
      for (let t of e.changedTouches) this.endTouch(t);
    });
  }

  startDrag(x, y) {
    this.dragging = true;
    this.startPos = { x: x - this.pos.x, y: y - this.pos.y };
    this.velocity = { x: 0, y: 0 };
    this.widget.el.style.cursor = 'grabbing';
  }

  drag(x, y) {
    if (!this.dragging) return;

    const newX = x - this.startPos.x;
    const newY = y - this.startPos.y;

    // Apply axis limits
    if (this.options.axis === 'x' || this.options.axis === 'both') {
      this.velocity.x = newX - this.pos.x;
      this.pos.x = newX;
    }
    if (this.options.axis === 'y' || this.options.axis === 'both') {
      this.velocity.y = newY - this.pos.y;
      this.pos.y = newY;
    }

    this.applyBounds();
    this.updatePosition();
  }

  endDrag() {
    this.dragging = false;
    this.widget.el.style.cursor = 'grab';
    if (this.options.inertia) this.startInertia();
  }

  // Touch handlers
  startTouch(touch) {
    this.activeTouches[touch.identifier] = { x: touch.clientX, y: touch.clientY };
    if (Object.keys(this.activeTouches).length === 1) {
      this.startDrag(touch.clientX, touch.clientY);
    }
  }

  dragTouch(touch) {
    if (!this.activeTouches[touch.identifier]) return;
    this.drag(touch.clientX, touch.clientY);
    this.activeTouches[touch.identifier] = { x: touch.clientX, y: touch.clientY };
  }

  endTouch(touch) {
    delete this.activeTouches[touch.identifier];
    if (Object.keys(this.activeTouches).length === 0) this.endDrag();
  }

  applyBounds() {
    if (!this.options.bounds) return;
    const b = this.options.bounds;
    if (b.xMin !== undefined) this.pos.x = Math.max(this.pos.x, b.xMin);
    if (b.xMax !== undefined) this.pos.x = Math.min(this.pos.x, b.xMax);
    if (b.yMin !== undefined) this.pos.y = Math.max(this.pos.y, b.yMin);
    if (b.yMax !== undefined) this.pos.y = Math.min(this.pos.y, b.yMax);
  }

  updatePosition() {
    this.widget.el.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
  }

  startInertia() {
    const step = () => {
      this.velocity.x *= this.options.deceleration;
      this.velocity.y *= this.options.deceleration;
      this.pos.x += this.velocity.x;
      this.pos.y += this.velocity.y;

      this.applyBounds();
      this.updatePosition();

      if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  setPosition(x, y) {
    this.pos.x = x;
    this.pos.y = y;
    this.updatePosition();
  }

  getPosition() {
    return { ...this.pos };
  }
}