export class GestureBehavior {
  constructor(widget, options = {}) {
    this.widget = widget;
    this.options = Object.assign({
      onTap: () => {},
      onDoubleTap: () => {},
      onLongPress: () => {},
      onSwipe: () => {}, // ({direction, dx, dy}) 
      onPinch: () => {}, // ({scale}) 
      onRotate: () => {}, // ({rotation}) 
      longPressTime: 600, // ms
      doubleTapTime: 300  // ms
    }, options);

    this._tapTimer = null;
    this._lastTap = 0;
    this._longPressTimer = null;
    this._touches = {};
    this._initialDistance = null;
    this._initialAngle = null;

    this.init();
  }

  init() {
    const el = this.widget.el;

    // Touch start
    el.addEventListener('touchstart', e => this.touchStart(e), { passive: false });
    el.addEventListener('touchmove', e => this.touchMove(e), { passive: false });
    el.addEventListener('touchend', e => this.touchEnd(e));
    el.addEventListener('touchcancel', e => this.touchEnd(e));

    // Mouse support for testing
    el.addEventListener('mousedown', e => this.mouseStart(e));
    document.addEventListener('mousemove', e => this.mouseMove(e));
    document.addEventListener('mouseup', e => this.mouseEnd(e));
  }

  // ---- TOUCH ----
  touchStart(e) {
    for (let t of e.changedTouches) {
      this._touches[t.identifier] = { x: t.clientX, y: t.clientY };
    }

    // Long press
    this._longPressTimer = setTimeout(() => {
      this.options.onLongPress(e);
    }, this.options.longPressTime);

    if (Object.keys(this._touches).length === 2) {
      const ids = Object.keys(this._touches);
      const t1 = this._touches[ids[0]];
      const t2 = this._touches[ids[1]];
      this._initialDistance = this.distance(t1, t2);
      this._initialAngle = this.angle(t1, t2);
    }
  }

  touchMove(e) {
    clearTimeout(this._longPressTimer);

    if (Object.keys(this._touches).length === 2) {
      // Pinch & rotate
      const ids = Object.keys(this._touches);
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const newDist = this.distance({x:t1.clientX,y:t1.clientY},{x:t2.clientX,y:t2.clientY});
      const scale = newDist / this._initialDistance;
      this.options.onPinch({ scale });

      const newAngle = this.angle({x:t1.clientX,y:t1.clientY},{x:t2.clientX,y:t2.clientY});
      const rotation = newAngle - this._initialAngle;
      this.options.onRotate({ rotation });
    }
  }

  touchEnd(e) {
    clearTimeout(this._longPressTimer);
    for (let t of e.changedTouches) delete this._touches[t.identifier];

    // Tap / Double tap
    const now = Date.now();
    if (now - this._lastTap < this.options.doubleTapTime) {
      this.options.onDoubleTap();
      this._lastTap = 0;
    } else {
      this._lastTap = now;
      this._tapTimer = setTimeout(() => {
        this.options.onTap();
      }, this.options.doubleTapTime);
    }

    // Swipe detection (simplified)
    for (let t of e.changedTouches) {
      const start = this._touches[t.identifier] || { x: t.clientX, y: t.clientY };
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
        const direction = Math.abs(dx) > Math.abs(dy)
          ? (dx > 0 ? 'right' : 'left')
          : (dy > 0 ? 'down' : 'up');
        this.options.onSwipe({ direction, dx, dy });
      }
    }
  }

  // ---- MOUSE (simple) ----
  mouseStart(e) {
    this._mouseDown = { x: e.clientX, y: e.clientY };
    this._longPressTimer = setTimeout(() => {
      this.options.onLongPress(e);
    }, this.options.longPressTime);
  }

  mouseMove(e) {
    clearTimeout(this._longPressTimer);
  }

  mouseEnd(e) {
    clearTimeout(this._longPressTimer);
    const dx = e.clientX - this._mouseDown.x;
    const dy = e.clientY - this._mouseDown.y;

    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      const now = Date.now();
      if (now - this._lastTap < this.options.doubleTapTime) {
        this.options.onDoubleTap(e);
        this._lastTap = 0;
      } else {
        this._lastTap = now;
        this._tapTimer = setTimeout(() => this.options.onTap(e), this.options.doubleTapTime);
      }
    } else if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
      const direction = Math.abs(dx) > Math.abs(dy)
        ? (dx > 0 ? 'right' : 'left')
        : (dy > 0 ? 'down' : 'up');
      this.options.onSwipe({ direction, dx, dy });
    }
  }

  // ---- Helpers ----
  distance(p1, p2) {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }

  angle(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  }
}