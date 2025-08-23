// core/properties.js

/**
 * Base Property class for reactive attributes
 */
export class Property {
  constructor(defaultValue = null) {
    this._value = defaultValue;
    this._observers = new Set();
  }

  get() {
    return this._value;
  }

  set(val) {
    if (this._value !== val) {
      this._value = val;
      this._notify(val);
    }
  }

  /**
   * Bind a callback to this property
   * @param {Function} callback 
   */
  bind(callback) {
    this._observers.add(callback);
  }

  /**
   * Unbind a callback
   * @param {Function} callback 
   */
  unbind(callback) {
    this._observers.delete(callback);
  }

  /**
   * Notify all observers
   * @param {*} val 
   */
  _notify(val) {
    for (const cb of this._observers) {
      cb(val);
    }
  }
}

/**
 * Specific property types
 */
export class NumericProperty extends Property {
  set(val) {
    if (typeof val !== "number") throw new TypeError("NumericProperty requires a number");
    super.set(val);
  }
}

export class StringProperty extends Property {
  set(val) {
    if (typeof val !== "string") throw new TypeError("StringProperty requires a string");
    super.set(val);
  }
}

export class BooleanProperty extends Property {
  set(val) {
    if (typeof val !== "boolean") throw new TypeError("BooleanProperty requires a boolean");
    super.set(val);
  }
}

/**
 * Helper to define reactive properties on a widget
 * @param {object} obj - widget instance
 * @param {string} name - property name
 * @param {Property} prop - property instance
 */
export function defineProperty(obj, name, prop) {
  Object.defineProperty(obj, name, {
    get() {
      return prop.get();
    },
    set(val) {
      prop.set(val);
    }
  });
}