import os

# Base directory for behaviors
base_dir = "/storage/emulated/0/code/kivyjs/behaviors"
os.makedirs(base_dir, exist_ok=True)

# Enhanced behavior files and their content
behaviors = {
    "scatter.js": """export class ScatterBehavior {
  constructor(widget) {
    this.widget = widget;
    this.transforms = { x: 0, y: 0, scale: 1, rotation: 0 };
    this.init();
  }

  init() {
    const el = this.widget.el;
    el.style.position = 'absolute';
    el.style.transformOrigin = 'center center';

    let dragging = false, startX, startY;
    let rotating = false, rotateStartX;

    // Drag
    el.addEventListener('mousedown', e => {
      if (e.button === 0) { // left click
        dragging = true;
        startX = e.clientX - this.transforms.x;
        startY = e.clientY - this.transforms.y;
      } else if (e.button === 2) { // right click for rotation
        rotating = true;
        rotateStartX = e.clientX;
      }
    });

    document.addEventListener('mousemove', e => {
      if (dragging) {
        this.transforms.x = e.clientX - startX;
        this.transforms.y = e.clientY - startY;
        this.applyTransform();
      }
      if (rotating) {
        this.transforms.rotation += e.clientX - rotateStartX;
        rotateStartX = e.clientX;
        this.applyTransform();
      }
    });

    document.addEventListener('mouseup', () => {
      dragging = false;
      rotating = false;
    });

    // Wheel for scaling
    el.addEventListener('wheel', e => {
      e.preventDefault();
      this.transforms.scale += e.deltaY * -0.001;
      this.transforms.scale = Math.max(0.1, this.transforms.scale);
      this.applyTransform();
    });

    // Prevent context menu on right-click
    el.addEventListener('contextmenu', e => e.preventDefault());
  }

  applyTransform() {
    const t = this.transforms;
    this.widget.el.style.transform = `translate(${t.x}px, ${t.y}px) rotate(${t.rotation}deg) scale(${t.scale})`;
  }
}
""",
    "multitouch.js": """export class MultiTouch {
  constructor(widget) {
    this.widget = widget;
    this.activeTouches = {};
    this.init();
  }

  init() {
    const el = this.widget.el;

    el.addEventListener('touchstart', e => {
      for (let t of e.changedTouches) this.activeTouches[t.identifier] = t;
    });

    el.addEventListener('touchmove', e => {
      for (let t of e.changedTouches) this.activeTouches[t.identifier] = t;
      console.log('Active touches:', Object.keys(this.activeTouches).length);
    });

    el.addEventListener('touchend', e => {
      for (let t of e.changedTouches) delete this.activeTouches[t.identifier];
    });

    el.addEventListener('touchcancel', e => {
      for (let t of e.changedTouches) delete this.activeTouches[t.identifier];
    });
  }
}
""",
    "stencilview.js": """export class StencilView {
  constructor(widget, options = {}) {
    this.widget = widget;
    this.apply(options);
  }

  apply(options) {
    const el = this.widget.el;
    el.style.overflow = options.overflow || 'hidden';
    if (options.clipPath) el.style.clipPath = options.clipPath;
    if (options.maskImage) el.style.webkitMaskImage = `url(${options.maskImage})`;
  }
}
"""
}

# Write each behavior file
for filename, content in behaviors.items():
    path = os.path.join(base_dir, filename)
    with open(path, "w") as f:
        f.write(content)
    print(f"{filename} created at {path}")
