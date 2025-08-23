export class FocusBehavior {
  constructor(widget, options = {}) {
    this.widget = widget;
    this.options = Object.assign({
      showIndicator: true,
      onFocus: () => {},
      onBlur: () => {},
      onKeyDown: () => {},
      onKeyUp: () => {},
      keySequences: [] // [{ sequence: ['Control', '1'], callback: ()=>{} }]
    }, options);

    this.focused = false;
    this._pressedKeys = new Set();
    this.init();
  }

  init() {
    const el = this.widget.el;
    el.tabIndex = 0;

    if (this.options.showIndicator) {
      el.style.outline = 'none';
      el.addEventListener('focus', () => el.style.boxShadow = '0 0 0 3px rgba(100,150,250,0.7)');
      el.addEventListener('blur', () => el.style.boxShadow = 'none');
    }

    el.addEventListener('mousedown', () => this.focus());
    el.addEventListener('touchstart', () => this.focus(), { passive: true });

    document.addEventListener('mousedown', e => {
      if (!el.contains(e.target)) this.blur();
    });

    el.addEventListener('keydown', e => this.handleKeyDown(e));
    el.addEventListener('keyup', e => this.handleKeyUp(e));
  }

  handleKeyDown(e) {
    this._pressedKeys.add(e.key);
    this.options.onKeyDown(e);

    // Check sequences
    this.options.keySequences.forEach(seqObj => {
      if (seqObj.sequence.every(k => this._pressedKeys.has(k))) {
        seqObj.callback();
      }
    });
  }

  handleKeyUp(e) {
    this._pressedKeys.delete(e.key);
    this.options.onKeyUp(e);
  }

  focus() {
    if (this.focused) return;
    this.focused = true;
    this.widget.el.focus();
    this.options.onFocus();
  }

  blur() {
    if (!this.focused) return;
    this.focused = false;
    this.widget.el.blur();
    this.options.onBlur();
    this._pressedKeys.clear();
  }

  isFocused() {
    return this.focused;
  }
}