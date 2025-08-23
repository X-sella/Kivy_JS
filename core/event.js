// core/event.js

/**
 * Simple event dispatcher for widgets
 */
export class EventDispatcher {
  constructor() {
    this._events = {}; // { eventName: [callback, ...] }
  }

  /**
   * Register a callback for an event
   * @param {string} eventName 
   * @param {Function} callback 
   */
  on(eventName, callback) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
    return callback;
  }

  /**
   * Remove a callback for an event
   * @param {string} eventName 
   * @param {Function} callback 
   */
  off(eventName, callback) {
    if (!this._events[eventName]) return;
    this._events[eventName] = this._events[eventName].filter(cb => cb !== callback);
  }

  /**
   * Dispatch an event to all listeners
   * @param {string} eventName 
   * @param  {...any} args 
   */
  emit(eventName, ...args) {
    if (!this._events[eventName]) return;
    // Copy array to prevent modification during iteration
    const listeners = [...this._events[eventName]];
    for (const cb of listeners) {
      cb(...args);
    }
  }

  /**
   * Check if there are listeners for an event
   * @param {string} eventName 
   * @returns {boolean}
   */
  hasListeners(eventName) {
    return Array.isArray(this._events[eventName]) && this._events[eventName].length > 0;
  }
}