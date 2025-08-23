// utils/animation.js
// Easing + animation utilities

/**
 * Common easing functions (inspired by Robert Penner’s equations)
 */
export const Easing = {
  linear: t => t,

  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => (t < 0.5) ? (2 * t * t) : (-1 + (4 - 2 * t) * t),

  easeInCubic: t => t * t * t,
  easeOutCubic: t => (--t) * t * t + 1,
  easeInOutCubic: t => (t < 0.5) ? (4 * t * t * t) : ((t - 1) * (2 * t - 2) * (2 * t - 2) + 1),

  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - (--t) * t * t * t,
  easeInOutQuart: t => (t < 0.5) ? (8 * t * t * t * t) : (1 - 8 * (--t) * t * t * t),

  easeInQuint: t => t * t * t * t * t,
  easeOutQuint: t => 1 + (--t) * t * t * t * t,
  easeInOutQuint: t => (t < 0.5) ? (16 * t * t * t * t * t) : (1 + 16 * (--t) * t * t * t * t),

  bounce: t => {
    if (t < 1 / 2.75) return 7.5625 * t * t;
    if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }
};

/**
 * Animate a numeric property over time
 * @param {Object} opts
 * @param {number} opts.from - start value
 * @param {number} opts.to - end value
 * @param {number} opts.duration - duration in ms
 * @param {function} opts.onUpdate - called with each frame (value)
 * @param {function} [opts.onComplete] - called when done
 * @param {function} [opts.easing] - easing function
 */
export function animate({ from, to, duration, onUpdate, onComplete, easing = Easing.linear }) {
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    let t = Math.min(elapsed / duration, 1); // [0..1]
    const value = from + (to - from) * easing(t);
    onUpdate(value);

    if (elapsed < duration) {
      requestAnimationFrame(tick);
    } else {
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(tick);
}

/**
 * Animate multiple properties of an object
 * @param {Object} target - object to animate
 * @param {Object} props - properties with {from,to}
 * @param {number} duration
 * @param {function} [onComplete]
 * @param {function} [easing]
 */
export function animateProps(target, props, duration, onComplete, easing = Easing.linear) {
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    let t = Math.min(elapsed / duration, 1);

    for (let key in props) {
      const { from, to } = props[key];
      target[key] = from + (to - from) * easing(t);
    }

    if (elapsed < duration) {
      requestAnimationFrame(tick);
    } else {
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(tick);
}