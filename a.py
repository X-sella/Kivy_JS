import os

# Root project directory
ROOT = "/storage/emulated/0/code/kivyjs"
BEHAVIORS = os.path.join(ROOT, "behaviors")

# Behavior files and starter code
behaviors = {
    "buttonBehavior.js": """// behaviors/buttonBehavior.js
export class ButtonBehavior {
  constructor(widget, handlers = {}) {
    this.widget = widget;
    this.handlers = handlers;
    this.widget.el.style.cursor = "pointer";

    this.widget.el.addEventListener("click", (e) => {
      if (this.handlers.onClick) this.handlers.onClick(e);
    });
  }
}
""",

    "toggleBehavior.js": """// behaviors/toggleBehavior.js
export class ToggleBehavior {
  constructor(widget, handlers = {}) {
    this.widget = widget;
    this.handlers = handlers;
    this.state = false;

    this.widget.el.addEventListener("click", () => {
      this.state = !this.state;
      if (this.handlers.onToggle) this.handlers.onToggle(this.state);
    });
  }
}
""",

    "dragBehavior.js": """// behaviors/dragBehavior.js
export class DragBehavior {
  constructor(widget) {
    this.widget = widget;
    this.dragging = False
    this.offset = { x: 0, y: 0 };

    this.widget.el.style.position = "absolute";

    this.widget.el.addEventListener("mousedown", (e) => {
      this.dragging = true;
      this.offset.x = e.clientX - this.widget.el.offsetLeft;
      this.offset.y = e.clientY - this.widget.el.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
      if (this.dragging) {
        this.widget.el.style.left = e.clientX - this.offset.x + "px";
        this.widget.el.style.top = e.clientY - this.offset.y + "px";
      }
    });

    document.addEventListener("mouseup", () => {
      this.dragging = false;
    });
  }
}
""",

    "focusBehavior.js": """// behaviors/focusBehavior.js
export class FocusBehavior {
  constructor(widget, handlers = {}) {
    this.widget = widget;
    this.handlers = handlers;
    this.widget.el.tabIndex = 0;

    this.widget.el.addEventListener("focus", (e) => {
      if (this.handlers.onFocus) this.handlers.onFocus(e);
    });

    this.widget.el.addEventListener("blur", (e) => {
      if (this.handlers.onBlur) this.handlers.onBlur(e);
    });
  }
}
""",

    "hoverBehavior.js": """// behaviors/hoverBehavior.js
export class HoverBehavior {
  constructor(widget, handlers = {}) {
    this.widget = widget;
    this.handlers = handlers;

    this.widget.el.addEventListener("mouseenter", (e) => {
      if (this.handlers.onHover) this.handlers.onHover(true, e);
    });

    this.widget.el.addEventListener("mouseleave", (e) => {
      if (this.handlers.onHover) this.handlers.onHover(false, e);
    });
  }
}
""",

    "multitouch.js": """// behaviors/multitouch.js
export class MultiTouch {
  constructor(widget, handlers = {}) {
    this.widget = widget;
    this.handlers = handlers;
    this.activeTouches = {};

    widget.el.addEventListener("touchstart", this.onStart.bind(this));
    widget.el.addEventListener("touchmove", this.onMove.bind(this));
    widget.el.addEventListener("touchend", this.onEnd.bind(this));
  }

  onStart(e) {
    for (let t of e.changedTouches) {
      this.activeTouches[t.identifier] = { x: t.clientX, y: t.clientY };
    }
    if (this.handlers.onStart) this.handlers.onStart(e, this.activeTouches);
  }

  onMove(e) {
    for (let t of e.changedTouches) {
      this.activeTouches[t.identifier] = { x: t.clientX, y: t.clientY };
    }
    if (this.handlers.onMove) this.handlers.onMove(e, this.activeTouches);
  }

  onEnd(e) {
    for (let t of e.changedTouches) {
      delete this.activeTouches[t.identifier];
    }
    if (this.handlers.onEnd) this.handlers.onEnd(e, this.activeTouches);
  }
}
""",

    "gestureBehavior.js": """// behaviors/gestureBehavior.js
export class GestureBehavior {
  constructor(widget, handlers = {}) {
    this.widget = widget;
    this.handlers = handlers;
    this.startX = null;
    this.startY = null;

    this.widget.el.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      this.startX = t.clientX;
      this.startY = t.clientY;
    });

    this.widget.el.addEventListener("touchend", (e) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - this.startX;
      const dy = t.clientY - this.startY;

      if (Math.abs(dx) > 50 && Math.abs(dy) < 30) {
        if (dx > 0 && this.handlers.onSwipeRight) this.handlers.onSwipeRight();
        if (dx < 0 && this.handlers.onSwipeLeft) this.handlers.onSwipeLeft();
      }

      if (Math.abs(dy) > 50 && Math.abs(dx) < 30) {
        if (dy > 0 && this.handlers.onSwipeDown) this.handlers.onSwipeDown();
        if (dy < 0 && this.handlers.onSwipeUp) this.handlers.onSwipeUp();
      }
    });
  }
}
""",

    "scatter.js": """// behaviors/scatter.js
import { MultiTouch } from "./multitouch.js";

export class Scatter {
  constructor(widget) {
    this.widget = widget;
    this.scale = 1;
    this.rotation = 0;
    this.translate = { x: 0, y: 0 };

    this.widget.el.style.transformOrigin = "center";

    new MultiTouch(widget, {
      onMove: (_, touches) => {
        const keys = Object.keys(touches);
        if (keys.length === 2) {
          const [t1, t2] = keys.map((k) => touches[k]);
          const dx = t2.x - t1.x;
          const dy = t2.y - t1.y;
          this.scale = Math.sqrt(dx * dx + dy * dy) / 100;
          this.applyTransform();
        }
      },
    });
  }

  applyTransform() {
    this.widget.el.style.transform =
      `translate(${this.translate.x}px, ${this.translate.y}px) ` +
      `scale(${this.scale}) rotate(${this.rotation}deg)`;
  }
}
""",

    "stencilView.js": """// behaviors/stencilView.js
export class StencilView {
  constructor(widget) {
    this.widget = widget;
    this.widget.el.style.overflow = "hidden";
  }
}
""",

    "scrollBehavior.js": """// behaviors/scrollBehavior.js
export class ScrollBehavior {
  constructor(widget, options = {}) {
    this.widget = widget;
    this.widget.el.style.overflowY = options.vertical ? "scroll" : "hidden";
    this.widget.el.style.overflowX = options.horizontal ? "scroll" : "hidden";
  }
}
"""
}

def main():
    os.makedirs(BEHAVIORS, exist_ok=True)

    for filename, content in behaviors.items():
        filepath = os.path.join(BEHAVIORS, filename)
        with open(filepath, "w") as f:
            f.write(content)
        print(f"Created {filepath}")

if __name__ == "__main__":
    main()