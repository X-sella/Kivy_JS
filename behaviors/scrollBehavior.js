export class ScrollBehavior {
  constructor(widget, options = {}) {
    this.widget = widget;
    this.options = Object.assign({
      scrollX: true,
      scrollY: true,
      showScrollbar: true,
      scrollbarAutoHide: true,
      inertia: true,
      deceleration: 0.95,
      showTouches: false // optional visual touch points
    }, options);

    this.activeTouches = {};
    this.init();
  }

  init() {
    const el = this.widget.el;
    el.style.position = 'relative';
    el.style.overflow = 'hidden';

    // Inner content
    const content = document.createElement('div');
    while (el.firstChild) content.appendChild(el.firstChild);
    el.appendChild(content);
    content.style.position = 'absolute';
    content.style.top = '0';
    content.style.left = '0';
    content.style.width = '100%';
    content.style.height = '100%';
    this.content = content;

    this.pos = { x: 0, y: 0 };
    this.startPos = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };

    // Optional touch indicators
    this.touchIndicators = {};

    // Mouse drag
    el.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      this.startPos.x = e.clientX - this.pos.x;
      this.startPos.y = e.clientY - this.pos.y;
      this.dragging = true;
    });

    document.addEventListener('mousemove', e => {
      if (!this.dragging) return;
      this.pos.x = e.clientX - this.startPos.x;
      this.pos.y = e.clientY - this.startPos.y;
      this.applyScroll();
    });

    document.addEventListener('mouseup', () => this.dragging = false);

    // Wheel scrolling
    el.addEventListener('wheel', e => {
      if (this.options.scrollX) this.pos.x -= e.deltaX;
      if (this.options.scrollY) this.pos.y -= e.deltaY;
      this.applyScroll();
    });

    // Touch scrolling
    el.addEventListener('touchstart', e => {
      for (let t of e.changedTouches) {
        this.activeTouches[t.identifier] = { x: t.clientX, y: t.clientY };
        if (this.options.showTouches) this.createTouchIndicator(t);
      }
      if (Object.keys(this.activeTouches).length === 1) {
        const t = e.changedTouches[0];
        this.startPos.x = t.clientX - this.pos.x;
        this.startPos.y = t.clientY - this.pos.y;
      }
    }, { passive: false });

    el.addEventListener('touchmove', e => {
      e.preventDefault();
      const ids = Object.keys(this.activeTouches);

      if (ids.length === 1) {
        const t = e.changedTouches[0];
        this.pos.x = t.clientX - this.startPos.x;
        this.pos.y = t.clientY - this.startPos.y;
        this.applyScroll();
      }

      for (let t of e.changedTouches) {
        if (this.options.showTouches && this.touchIndicators[t.identifier]) {
          const ind = this.touchIndicators[t.identifier];
          ind.style.left = `${t.clientX - 10}px`;
          ind.style.top = `${t.clientY - 10}px`;
        }
        this.activeTouches[t.identifier] = { x: t.clientX, y: t.clientY };
      }
    }, { passive: false });

    el.addEventListener('touchend', e => this.removeTouches(e));
    el.addEventListener('touchcancel', e => this.removeTouches(e));

    // Scrollbars
    if (this.options.showScrollbar) this.createScrollbars();

    this.loop();
  }

  removeTouches(e) {
    for (let t of e.changedTouches) {
      delete this.activeTouches[t.identifier];
      if (this.options.showTouches && this.touchIndicators[t.identifier]) {
        this.widget.el.removeChild(this.touchIndicators[t.identifier]);
        delete this.touchIndicators[t.identifier];
      }
    }
  }

  applyScroll() {
    this.content.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
    if (this.vScrollbar || this.hScrollbar) this.updateScrollbars();
  }

  inertiaScroll() {
    const step = () => {
      this.velocity.x *= this.options.deceleration;
      this.velocity.y *= this.options.deceleration;
      this.pos.x += this.velocity.x;
      this.pos.y += this.velocity.y;
      this.applyScroll();
      if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  createScrollbars() {
    const el = this.widget.el;
    if (this.options.scrollY) {
      const v = document.createElement('div');
      v.style.position = 'absolute';
      v.style.width = '6px';
      v.style.background = 'rgba(0,0,0,0.5)';
      v.style.top = '0';
      v.style.right = '2px';
      v.style.borderRadius = '3px';
      if (this.options.scrollbarAutoHide) v.style.transition = 'opacity 0.3s';
      el.appendChild(v);
      this.vScrollbar = v;
    }
    if (this.options.scrollX) {
      const h = document.createElement('div');
      h.style.position = 'absolute';
      h.style.height = '6px';
      h.style.background = 'rgba(0,0,0,0.5)';
      h.style.left = '0';
      h.style.bottom = '2px';
      h.style.borderRadius = '3px';
      if (this.options.scrollbarAutoHide) h.style.transition = 'opacity 0.3s';
      el.appendChild(h);
      this.hScrollbar = h;
    }
    this.updateScrollbars();
  }

  updateScrollbars() {
    const el = this.widget.el;
    const contentRect = this.content.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    if (this.vScrollbar) {
      const heightRatio = elRect.height / contentRect.height;
      this.vScrollbar.style.height = `${Math.max(heightRatio * elRect.height, 20)}px`;
      this.vScrollbar.style.top = `${-this.pos.y * heightRatio}px`;
      if (this.options.scrollbarAutoHide) this.vScrollbar.style.opacity = 1;
    }

    if (this.hScrollbar) {
      const widthRatio = elRect.width / contentRect.width;
      this.hScrollbar.style.width = `${Math.max(widthRatio * elRect.width, 20)}px`;
      this.hScrollbar.style.left = `${-this.pos.x * widthRatio}px`;
      if (this.options.scrollbarAutoHide) this.hScrollbar.style.opacity = 1;
    }
  }

  createTouchIndicator(t) {
    if (!this.touchIndicators) this.touchIndicators = {};
    const ind = document.createElement('div');
    ind.style.position = 'absolute';
    ind.style.width = '20px';
    ind.style.height = '20px';
    ind.style.background = 'rgba(255,0,0,0.5)';
    ind.style.borderRadius = '50%';
    ind.style.left = `${t.clientX - 10}px`;
    ind.style.top = `${t.clientY - 10}px`;
    this.widget.el.appendChild(ind);
    this.touchIndicators[t.identifier] = ind;
  }

  loop() {
    requestAnimationFrame(() => {
      if (this.options.scrollbarAutoHide) {
        if (this.vScrollbar) this.vScrollbar.style.opacity = 0;
        if (this.hScrollbar) this.hScrollbar.style.opacity = 0;
      }
      this.loop();
    });
  }
}