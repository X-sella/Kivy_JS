// widgets/tabpanel.js
import { Widget } from "../core/widget.js";
import { defineProperty, NumericProperty, StringProperty } from "../core/properties.js";
import { TabPanelStyle } from "../styles/tabPanelStyle.js";

export class TabPanel extends Widget {
  constructor(options = {}) {
    super(options);

    // Tabs: { title: Widget, content: Widget }
    this.tabs = [];

    defineProperty(this, "activeIndex", new NumericProperty(0));

    // Container for tab headers
    this.headerContainer = new Widget();
    this.headerContainer.el.style.display = "flex";

    // Container for tab content
    this.contentContainer = new Widget();

    this.addWidget(this.headerContainer);
    this.addWidget(this.contentContainer);

    // Apply default style
    this.style = new TabPanelStyle().getCSS();

    // Update displayed tab when activeIndex changes
    this.activeIndex.bind(idx => this._updateActiveTab());
  }

  /**
   * Add a new tab
   * @param {string} title - tab header text
   * @param {Widget} content - tab content
   */
  addTab(title, content) {
    const tabHeader = new Widget();
    tabHeader.setText(title);
    tabHeader.el.style.cursor = "pointer";
    tabHeader.el.style.marginRight = "5px";
    tabHeader.el.style.padding = "5px";

    tabHeader.on("click", () => {
      const idx = this.tabs.findIndex(t => t.title === tabHeader);
      this.activeIndex = idx;
    });

    this.tabs.push({ title: tabHeader, content });
    this.headerContainer.addWidget(tabHeader);
    this.contentContainer.addWidget(content);

    // Only the first tab visible by default
    content.visible = this.tabs.length === 1;
  }

  /**
   * Update visibility of tabs based on activeIndex
   */
  _updateActiveTab() {
    this.tabs.forEach((tab, idx) => {
      tab.content.visible = idx === this.activeIndex;
      tab.title.el.style.fontWeight = idx === this.activeIndex ? "bold" : "normal";
    });
  }
}