// utils/logger.js
// Simple logging utility for kivy.js

class Logger {
  constructor() {
    this.levels = ["DEBUG", "INFO", "WARN", "ERROR"];
    this.currentLevel = "DEBUG";   // default log level
    this.enabled = true;           // toggle global logging
  }

  setLevel(level) {
    if (this.levels.includes(level)) {
      this.currentLevel = level;
    } else {
      console.warn(`Logger: invalid level '${level}', using DEBUG`);
      this.currentLevel = "DEBUG";
    }
  }

  enable() { this.enabled = true; }
  disable() { this.enabled = false; }

  _shouldLog(level) {
    return this.enabled &&
           this.levels.indexOf(level) >= this.levels.indexOf(this.currentLevel);
  }

  _timestamp() {
    return new Date().toISOString();
  }

  debug(...args) {
    if (this._shouldLog("DEBUG")) {
      console.log(`%c[DEBUG] ${this._timestamp()}`, "color: gray;", ...args);
    }
  }

  info(...args) {
    if (this._shouldLog("INFO")) {
      console.log(`%c[INFO] ${this._timestamp()}`, "color: blue;", ...args);
    }
  }

  warn(...args) {
    if (this._shouldLog("WARN")) {
      console.warn(`%c[WARN] ${this._timestamp()}`, "color: orange;", ...args);
    }
  }

  error(...args) {
    if (this._shouldLog("ERROR")) {
      console.error(`%c[ERROR] ${this._timestamp()}`, "color: red;", ...args);
    }
  }
}

// Singleton instance
export const logger = new Logger();