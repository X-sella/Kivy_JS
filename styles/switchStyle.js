export class SwitchStyle {
  constructor() {
    this.css = `
      .kivy-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
      }

      .kivy-switch .switch-input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .kivy-switch .switch-track {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #ccc;
        border-radius: 24px;
        transition: background-color 0.3s;
      }

      .kivy-switch .switch-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background-color: #fff;
        border-radius: 50%;
        transition: transform 0.3s;
      }

      .kivy-switch .switch-input:checked + .switch-track {
        background-color: #2196F3;
      }

      .kivy-switch .switch-input:checked + .switch-track .switch-thumb {
        transform: translateX(26px);
      }
    `;
  }

  getCSS() { return this.css; }
}