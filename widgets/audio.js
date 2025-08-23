import { Widget } from "../core/widget.js";
import { AudioStyle } from "../styles/audioStyle.js";

export class Audio extends Widget {
  constructor(options = {}) {
    super();

    // Apply default style
    this.el.classList.add("audio-container");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new AudioStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Audio element
    this.audio = document.createElement("audio");
    this.audio.src = options.src || "";
    this.audio.loop = options.loop || false;
    this.audio.volume = options.volume !== undefined ? options.volume : 1;

    // Play/Pause button
    this.playBtn = document.createElement("button");
    this.playBtn.classList.add("audio-play-btn");
    this.playBtn.textContent = "▶";

    // Progress bar
    this.progressBar = document.createElement("div");
    this.progressBar.classList.add("audio-progress");
    this.progressBarInner = document.createElement("div");
    this.progressBarInner.classList.add("audio-progress-inner");
    this.progressBar.appendChild(this.progressBarInner);

    // Time display
    this.timeDisplay = document.createElement("span");
    this.timeDisplay.classList.add("audio-time");
    this.updateTime();

    // Volume slider
    this.volumeInput = document.createElement("input");
    this.volumeInput.type = "range";
    this.volumeInput.min = 0;
    this.volumeInput.max = 1;
    this.volumeInput.step = 0.01;
    this.volumeInput.value = this.audio.volume;
    this.volumeInput.classList.add("audio-volume");

    // Append widgets
    this.addChild(this.playBtn);
    this.addChild(this.progressBar);
    this.addChild(this.timeDisplay);
    this.addChild(this.volumeInput);

    // Inline styling
    if (options.style) this.style = options.style;

    // Events
    this.playBtn.addEventListener("click", () => this.toggle());
    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("play", () => this.playBtn.textContent = "❚❚");
    this.audio.addEventListener("pause", () => this.playBtn.textContent = "▶");
    this.audio.addEventListener("ended", () => {
      this.playBtn.textContent = "▶";
      this.updateProgress();
    });

    // Volume control
    this.volumeInput.addEventListener("input", (e) => {
      this.audio.volume = e.target.value;
    });
  }

  play() { this.audio.play(); }
  pause() { this.audio.pause(); }
  stop() { this.audio.pause(); this.audio.currentTime = 0; this.updateProgress(); }
  toggle() { this.audio.paused ? this.play() : this.pause(); }
  setVolume(vol) { this.audio.volume = vol; this.volumeInput.value = vol; }

  updateProgress() {
    const pct = (this.audio.currentTime / this.audio.duration) * 100 || 0;
    this.progressBarInner.style.width = pct + "%";
    this.updateTime();
  }

  updateTime() {
    const c = this.audio.currentTime;
    const d = this.audio.duration || 0;
    this.timeDisplay.textContent = `${this.formatTime(c)} / ${this.formatTime(d)}`;
  }

  formatTime(sec) {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }
}