export class ScatterBehavior {
  constructor(widget) {
    this.widget = widget;
    this.transforms = { x: 0, y: 0, scale: 1, rotation: 0 };
    this.activeTouches = {};
    this.init();
  }

  init() {
    const el = this.widget.el;
    el.style.position = 'absolute';
    el.style.transformOrigin = 'center center';

    let dragging = false, rotateStartX, startX, startY;

    // Mouse drag (left click)
    el.addEventListener('mousedown', e => {
      if (e.button === 0) { // left click
        dragging = true;
        startX = e.clientX - this.transforms.x;
        startY = e.clientY - this.transforms.y;
      } else if (e.button === 2) { // right click for rotation
        rotateStartX = e.clientX;
      }
    });

    document.addEventListener('mousemove', e => {
      if (dragging) {
        this.transforms.x = e.clientX - startX;
        this.transforms.y = e.clientY - startY;
        this.applyTransform();
      } else if (rotateStartX !== undefined) {
        this.transforms.rotation += e.clientX - rotateStartX;
        rotateStartX = e.clientX;
        this.applyTransform();
      }
    });

    document.addEventListener('mouseup', () => {
      dragging = false;
      rotateStartX = undefined;
    });

    // Wheel for scaling
    el.addEventListener('wheel', e => {
      e.preventDefault();
      this.transforms.scale += e.deltaY * -0.001;
      this.transforms.scale = Math.max(0.1, this.transforms.scale);
      this.applyTransform();
    });

    // Touch support (drag & pinch zoom)
    el.addEventListener('touchstart', e => {
      for (let t of e.changedTouches) this.activeTouches[t.identifier] = t;
      if (Object.keys(this.activeTouches).length === 1) {
        // single touch -> drag
        const t = e.changedTouches[0];
        startX = t.clientX - this.transforms.x;
        startY = t.clientY - this.transforms.y;
      }
    });

    el.addEventListener('touchmove', e => {
      e.preventDefault();
      const ids = Object.keys(this.activeTouches);
      if (ids.length === 1) {
        const t = e.changedTouches[0];
        this.transforms.x = t.clientX - startX;
        this.transforms.y = t.clientY - startY;
        this.applyTransform();
      } else if (ids.length === 2) {
        // pinch for scaling
        const t1 = this.activeTouches[ids[0]];
        const t2 = this.activeTouches[ids[1]];
        const currentT1 = Array.from(e.touches).find(t => t.identifier == t1.identifier);
        const currentT2 = Array.from(e.touches).find(t => t.identifier == t2.identifier);
        if (currentT1 && currentT2) {
          const distStart = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
          const distNow = Math.hypot(currentT2.clientX - currentT1.clientX, currentT2.clientY - currentT1.clientY);
          this.transforms.scale *= distNow / distStart;
          this.applyTransform();
        }
      }

      for (let t of e.changedTouches) this.activeTouches[t.identifier] = t;
    }, { passive: false });

    el.addEventListener('touchend', e => {
      for (let t of e.changedTouches) delete this.activeTouches[t.identifier];
    });

    el.addEventListener('touchcancel', e => {
      for (let t of e.changedTouches) delete this.activeTouches[t.identifier];
    });

    // Prevent context menu on right click
    el.addEventListener('contextmenu', e => e.preventDefault());
  }

  applyTransform() {
    const t = this.transforms;
    this.widget.el.style.transform = `translate(${t.x}px, ${t.y}px) rotate(${t.rotation}deg) scale(${t.scale})`;
  }
}