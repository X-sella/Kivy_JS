export class ToggleBehavior {
  constructor(widget, options = {}) {
    this.widget = widget;
    this.state = options.initialState || false; // false = 'off', true = 'on'
    this.onToggle = options.onToggle || (() => {}); // callback when toggled
    this.init();
  }

  init() {
    const el = this.widget.el;

    // Apply cursor pointer
    el.style.cursor = 'pointer';

    // Initialize appearance
    this.updateAppearance();

    // Click / touch listener
    el.addEventListener('click', e => this.toggle());
    el.addEventListener('touchend', e => {
      e.preventDefault();
      this.toggle();
    });
  }

  toggle() {
    this.state = !this.state;
    this.updateAppearance();
    this.onToggle(this.state);
  }

  setState(value) {
    this.state = !!value;
    this.updateAppearance();
  }

  getState() {
    return this.state;
  }

  updateAppearance() {
    // You can customize appearance here
    if (this.state) {
      this.widget.el.style.backgroundColor = '#4caf50'; // green for "on"
      this.widget.el.style.color = '#fff';
    } else {
      this.widget.el.style.backgroundColor = '#f44336'; // red for "off"
      this.widget.el.style.color = '#fff';
    }
  }
}