export class MultiTouch {
  constructor(widget) {
    this.widget = widget;
    this.activeTouches = {};
    this.touchIndicators = {};
    this.init();
  }

  init() {
    let el = this.widget.el;

    // Ensure widget has size for indicators
    if (!el.style.width) el.style.width = '200px';
    if (!el.style.height) el.style.height = '200px';
    el.style.position = 'relative';

    el.addEventListener('touchstart', e => {
      for (let t of e.changedTouches) {
        this.activeTouches[t.identifier] = t;
        console.log(`Touch start: id=${t.identifier}, x=${t.clientX}, y=${t.clientY}`);

        const circle = document.createElement('div');
        circle.style.position = 'absolute';
        circle.style.width = '20px';
        circle.style.height = '20px';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = this.randomColor();
        circle.style.left = (t.clientX - el.getBoundingClientRect().left - 10) + 'px';
        circle.style.top = (t.clientY - el.getBoundingClientRect().top - 10) + 'px';
        circle.style.pointerEvents = 'none';
        circle.style.opacity = 0.7;

        // If widget is not in DOM, append to body for testing
        if (!document.body.contains(el)) {
          document.body.appendChild(circle);
        } else {
          el.appendChild(circle);
        }
        this.touchIndicators[t.identifier] = circle;
      }
    });

    el.addEventListener('touchmove', e => {
      for (let t of e.changedTouches) {
        this.activeTouches[t.identifier] = t;
        console.log(`Touch move: id=${t.identifier}, x=${t.clientX}, y=${t.clientY}`);
        const circle = this.touchIndicators[t.identifier];
        if (circle) {
          circle.style.left = (t.clientX - el.getBoundingClientRect().left - 10) + 'px';
          circle.style.top = (t.clientY - el.getBoundingClientRect().top - 10) + 'px';
        }
      }
    });

    el.addEventListener('touchend', e => {
      for (let t of e.changedTouches) {
        delete this.activeTouches[t.identifier];
        console.log(`Touch end: id=${t.identifier}, x=${t.clientX}, y=${t.clientY}`);
        const circle = this.touchIndicators[t.identifier];
        if (circle) circle.remove();
        delete this.touchIndicators[t.identifier];
      }
    });

    el.addEventListener('touchcancel', e => {
      for (let t of e.changedTouches) {
        delete this.activeTouches[t.identifier];
        console.log(`Touch cancel: id=${t.identifier}, x=${t.clientX}, y=${t.clientY}`);
        const circle = this.touchIndicators[t.identifier];
        if (circle) circle.remove();
        delete this.touchIndicators[t.identifier];
      }
    });
  }

  randomColor() {
    const r = Math.floor(Math.random() * 200 + 55);
    const g = Math.floor(Math.random() * 200 + 55);
    const b = Math.floor(Math.random() * 200 + 55);
    return `rgb(${r},${g},${b})`;
  }
}