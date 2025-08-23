// core/app.js
import { Widget } from "./widget.js";

/**
 * Base App class for Kivy.js
 * Similar to kivy.app.App in Python
 */
export class App {
  constructor() {
    this.root = null; // will store the root widget returned by build()
  }

  /**
   * Subclasses override this to return the root widget.
   * Example:
   *   build() {
   *     return new Kivy.Label({ text: "Hello World!" });
   *   }
   */
  build() {
    throw new Error("You must implement build() in your App subclass");
  }

  /**
   * Run the application
   * @param {string} target - CSS selector for target container (default: body)
   */
  run(target = "body") {
    document.addEventListener("DOMContentLoaded", () => {
      this.root = this.build();
      if (!(this.root instanceof Widget)) {
        throw new Error("App.build() must return a Widget");
      }

      const container = document.querySelector(target);
      if (!container) {
        throw new Error(`Target '${target}' not found in document`);
      }

      container.innerHTML = ""; // clear existing children
      container.appendChild(this.root.render()); // mount root widget
    });
  }
}