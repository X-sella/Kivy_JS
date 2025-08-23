import { Widget } from "../core/widget.js";

export class Table extends Widget {
  constructor(options = {}) {
    super();

    this.el.classList.add("kivy-table");

    this.headers = options.headers || [];
    this.rows = options.rows || [];
    this.striped = options.striped || false;

    this.style = options.style || ""; // Inline styling
    this.cellStyle = options.cellStyle || ""; // Inline styling for cells
    this.headerStyle = options.headerStyle || ""; // Inline styling for header

    this.tableEl = document.createElement("table");
    if (this.style) this.tableEl.style.cssText = this.style;

    this.renderTable();
    this.addChild(this.tableEl);
  }

  /** Render the full table */
  renderTable() {
    this.tableEl.innerHTML = "";

    // Render header
    if (this.headers.length > 0) {
      const thead = document.createElement("thead");
      const tr = document.createElement("tr");
      this.headers.forEach((header) => {
        const th = document.createElement("th");
        th.innerText = header;
        if (this.headerStyle) th.style.cssText = this.headerStyle;
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      this.tableEl.appendChild(thead);
    }

    // Render body
    const tbody = document.createElement("tbody");
    this.rows.forEach((row, i) => {
      const tr = document.createElement("tr");
      if (this.striped && i % 2 === 1) tr.style.backgroundColor = "#f2f2f2";

      row.forEach((cell) => {
        const td = document.createElement("td");
        if (cell instanceof Table) {
          td.appendChild(cell.render());
        } else {
          td.innerText = cell;
        }
        if (this.cellStyle) td.style.cssText = this.cellStyle;
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
    this.tableEl.appendChild(tbody);
  }

  /** Set table rows dynamically */
  setRows(rows) {
    this.rows = rows;
    this.renderTable();
  }

  /** Set headers dynamically */
  setHeaders(headers) {
    this.headers = headers;
    this.renderTable();
  }

  /** Get the table element */
  render() {
    return this.tableEl;
  }
}