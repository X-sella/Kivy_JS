import { Widget } from "../core/widget.js";
import { VideoStyle } from "../styles/videoStyle.js";

export class Video extends Widget {
  constructor(options = {}) {
    super();

    // Container
    this.el.classList.add("kivy-video");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new VideoStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Video element
    this.video = document.createElement("video");
    this.video.src = options.src || "";
    this.video.controls = false;
    this.video.loop = options.loop || false;
    this.video.volume = options.volume !== undefined ? options.volume : 1;
    this.video.style.width = "100%";
    this.addChild(this.video);

    // Controls container
    this.controls = document.createElement("div");
    this.controls.classList.add("video-controls");

    // Play/Pause button
    this.playBtn = document.createElement("button");
    this.playBtn.classList.add("video-play-btn");
    this.playBtn.textContent = "▶";

    // Progress bar
    this.progressBar = document.createElement("div");
    this.progressBar.classList.add("video-progress");
    this.progressInner = document.createElement("div");
    this.progressInner.classList.add("video-progress-inner");
    this.progressBar.appendChild(this.progressInner);

    // Time display
    this.timeDisplay = document.createElement("span");
    this.timeDisplay.classList.add("video-time");

    // Volume slider
    this.volumeInput = document.createElement("input");
    this.volumeInput.type = "range";
    this.volumeInput.min = 0;
    this.volumeInput.max = 1;
    this.volumeInput.step = 0.01;
    this.volumeInput.value = this.video.volume;
    this.volumeInput.classList.add("video-volume");

    // Assemble controls
    this.controls.appendChild(this.playBtn);
    this.controls.appendChild(this.progressBar);
    this.controls.appendChild(this.timeDisplay);
    this.controls.appendChild(this.volumeInput);
    this.addChild(this.controls);

    // Inline style
    if (options.style) this.style = options.style;

    // Event handlers
    this.playBtn.addEventListener("click", () => this.toggle());
    this.video.addEventListener("play", () => this.playBtn.textContent = "❚❚");
    this.video.addEventListener("pause", () => this.playBtn.textContent = "▶");
    this.video.addEventListener("timeupdate", () => this.updateProgress());
    this.video.addEventListener("ended", () => {
      this.playBtn.textContent = "▶";
      if (options.onEnded) options.onEnded();
    });

    this.volumeInput.addEventListener("input", e => this.video.volume = e.target.value);

    if (options.onPlay) this.video.addEventListener("play", options.onPlay);
    if (options.onPause) this.video.addEventListener("pause", options.onPause);
    if (options.onTimeUpdate) this.video.addEventListener("timeupdate", options.onTimeUpdate);

    this.updateProgress();
  }

  play() { this.video.play(); }
  pause() { this.video.pause(); }
  stop() { this.video.pause(); this.video.currentTime = 0; this.updateProgress(); }
  toggle() { this.video.paused ? this.play() : this.pause(); }

  updateProgress() {
    const pct = (this.video.currentTime / this.video.duration) * 100 || 0;
    this.progressInner.style.width = pct + "%";
    this.updateTime();
  }

  updateTime() {
    const c = this.video.currentTime;
    const d = this.video.duration || 0;
    this.timeDisplay.textContent = `${this.formatTime(c)} / ${this.formatTime(d)}`;
  }

  formatTime(sec) {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  setSource(src) {
    this.video.src = src;
    this.video.load();
  }
}