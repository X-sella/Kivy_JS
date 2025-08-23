import { Widget } from "../core/widget.js";
import { FileChooserStyle } from "../styles/fileChooserStyle.js";

export class FileChooser extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-filechooser");
    const styleSheet = document.createElement("style");
    styleSheet.innerText = new FileChooserStyle().getCSS();
    document.head.appendChild(styleSheet);

    // Local file input
    this.input = document.createElement("input");
    this.input.type = "file";

    if (options.multiple) this.input.multiple = true;
    if (options.directory) this.input.webkitdirectory = true;
    if (options.accept) this.input.accept = options.accept;

    this.input.classList.add("filechooser-input");
    this.addChild(this.input);

    // URL input
    if (options.enableURL) {
      this.urlInput = document.createElement("input");
      this.urlInput.type = "text";
      this.urlInput.placeholder = "Enter file URL...";
      this.urlInput.classList.add("filechooser-url");
      this.addChild(this.urlInput);

      this.loadBtn = document.createElement("button");
      this.loadBtn.textContent = "Load URL";
      this.loadBtn.classList.add("filechooser-loadbtn");
      this.addChild(this.loadBtn);

      this.loadBtn.addEventListener("click", async () => {
        const url = this.urlInput.value;
        if (!url) return;
        const data = await this.loadFromURL(url);
        this.triggerRead([data]);
      });
    }

    // Drag-and-drop area
    this.dropArea = document.createElement("div");
    this.dropArea.textContent = "Drag files here";
    this.dropArea.classList.add("filechooser-drop");
    this.addChild(this.dropArea);

    this.dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.dropArea.classList.add("dragover");
    });

    this.dropArea.addEventListener("dragleave", (e) => {
      e.preventDefault();
      this.dropArea.classList.remove("dragover");
    });

    this.dropArea.addEventListener("drop", async (e) => {
      e.preventDefault();
      this.dropArea.classList.remove("dragover");
      const files = Array.from(e.dataTransfer.files);
      this.triggerRead(files);
    });

    // Event callbacks
    this.onSelect = options.onSelect || null;
    this.onRead = options.onRead || null;

    // Local file selection
    this.input.addEventListener("change", (e) => {
      const files = Array.from(this.input.files);
      this.triggerRead(files);
    });

    // Inline styling
    if (options.style) this.style = options.style;
  }

  /** Trigger reading files and calling events */
  async triggerRead(files) {
    if (this.onSelect) this.onSelect(files);

    if (this.onRead) {
      const results = await this.readFiles(files);
      this.onRead(results);
    }
  }

  /** Get selected local files */
  getValue() {
    return Array.from(this.input.files);
  }

  /** Clear selection */
  clear() {
    this.input.value = "";
    if (this.urlInput) this.urlInput.value = "";
  }

  /** Read local files */
  async readFiles(files = null) {
    const selectedFiles = files || this.getValue();
    const results = [];
    for (const file of selectedFiles) {
      const content = await this.readFile(file);
      results.push({ name: file.name, type: file.type, content });
    }
    return results;
  }

  /** Read a single file using FileReader */
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (file.type.startsWith("image/")) reader.readAsDataURL(file);
      else if (file.type.startsWith("text/") || file.type === "application/json") reader.readAsText(file);
      else reader.readAsArrayBuffer(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  }

  /** Load a file from URL */
  async loadFromURL(url) {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type") || "";

    let content;
    if (contentType.startsWith("image/")) {
      const blob = await response.blob();
      content = await new Promise(r => {
        const reader = new FileReader();
        reader.onload = () => r(reader.result);
        reader.readAsDataURL(blob);
      });
    } else {
      content = await response.text();
    }

    const name = url.split("/").pop() || "remote_file";
    return { name, type: contentType, content };
  }
}