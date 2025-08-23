//core/clock.js
export const Clock = {
  _time: 0,             // virtual clock time in seconds
  _queue: [],           // scheduled callbacks (tick mode)
  _running: false,      // auto-loop flag
  _autoStart: false,    // flag to auto-start when requested

  /**
   * Schedule a function to run once after a delay (seconds)
   */
  schedule_once(callback, delay = 0) {
    const event = { callback, trigger_time: this._time + delay, repeat: false };
    this._queue.push(event);
    return event;
  },

  /**
   * Schedule a function to run repeatedly at interval (seconds)
   */
  schedule_interval(callback, interval = 1 / 60) {
    const event = { callback, interval, trigger_time: this._time + interval, repeat: true };
    this._queue.push(event);
    return event;
  },

  /**
   * Unschedule an event
   */
  unschedule(event) {
    this._queue = this._queue.filter(e => e !== event);
  },

  /**
   * Tick the clock forward by dt seconds
   */
  tick(dt = 1 / 60) {
    this._time += dt;
    const due = this._queue.filter(e => e.trigger_time <= this._time);
    for (let e of due) {
      e.callback(dt);
      if (e.repeat) {
        e.trigger_time += e.interval;
      } else {
        this.unschedule(e);
      }
    }
  },

  /**
   * Start the auto-loop
   */
  start() {
    if (this._running) return;
    this._running = true;
    let last = performance.now();

    const loop = (now) => {
      if (!this._running) return;
      const dt = (now - last) / 1000; // seconds
      last = now;
      this.tick(dt);
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  },

  /**
   * Stop the auto-loop
   */
  stop() {
    this._running = false;
  },

  /**
   * Real-time helpers (native timers)
   */
  schedule_timeout(callback, delay = 0) {
    return setTimeout(callback, delay * 1000);
  },

  schedule_interval_real(callback, interval = 1 / 60) {
    return setInterval(callback, interval * 1000);
  },

  unschedule_real(id) {
    clearTimeout(id);
    clearInterval(id);
  },

  schedule_frame(callback) {
    return requestAnimationFrame(callback);
  },

  cancel_frame(id) {
    cancelAnimationFrame(id);
  },

  /**
   * Auto-start helper (called by App)
   */
  attachAutoStart() {
    if (!this._autoStart) {
      this._autoStart = true;
      this.start();
    }
  }
};