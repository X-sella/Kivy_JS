export class ButtonBehavior {
  constructor(widget, options = {}) {
    this.widget = widget;
    this.options = Object.assign({
      onPress: () => {},
      onRelease: () => {},
      hoverEffect: false
    }, options);

    this.isPressed = false;
    this.init();
  }

  init() {
    const el = this.widget.el;
    el.style.cursor = 'pointer';
    el.style.userSelect = 'none';
    
    // Mouse events
    el.addEventListener('mousedown', e => this.press(e));
    document.addEventListener('mouseup', e => this.release(e));
    
    // Touch events
    el.addEventListener('touchstart', e => {
      e.preventDefault();
      this.press(e);
    }, { passive: false });
    el.addEventListener('touchend', e => {
      e.preventDefault();
      this.release(e);
    });

    // Optional hover effect
    if (this.options.hoverEffect) {
      el.addEventListener('mouseenter', () => el.style.opacity = '0.8');
      el.addEventListener('mouseleave', () => el.style.opacity = '1');
    }
  }

  press(event) {
    this.isPressed = true;
    this.widget.el.classList.add('pressed');
    this.options.onPress(event);
    // Visual feedback
    this.widget.el.style.transform = 'scale(0.97)';
  }

  release(event) {
    if (!this.isPressed) return;
    this.isPressed = false;
    this.widget.el.classList.remove('pressed');
    this.options.onRelease(event);
    // Restore visual
    this.widget.el.style.transform = 'scale(1)';
  }

  // Allow programmatically triggering the button
  trigger() {
    this.options.onPress();
    this.options.onRelease();
  }
}