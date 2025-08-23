export class LayoutStyle {
  constructor() {
    this.css = `
      /* General Layout Defaults */
      .kivy-boxlayout,
      .kivy-gridlayout,
      .kivy-floatlayout,
      .kivy-relativelayout,
      .kivy-anchorlayout,
      .kivy-pagelayout,
      .kivy-scatterlayout,
      .kivy-stacklayout {
        box-sizing: border-box;
        margin: 0;
        padding: 8px;
        background-color: transparent;
        font-family: Arial, sans-serif;
      }

      /* BoxLayout */
      .kivy-boxlayout.horizontal {
        display: flex;
        flex-direction: row;
      }
      .kivy-boxlayout.vertical {
        display: flex;
        flex-direction: column;
      }

      /* GridLayout */
      .kivy-gridlayout {
        display: grid;
        gap: 8px;
      }

      /* FloatLayout */
      .kivy-floatlayout {
        position: relative;
      }

      /* RelativeLayout */
      .kivy-relativelayout {
        position: relative;
      }

      /* AnchorLayout */
      .kivy-anchorlayout {
        display: flex;
      }

      /* PageLayout */
      .kivy-pagelayout {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
      }
      .kivy-pagelayout > * {
        scroll-snap-align: start;
        flex-shrink: 0;
      }

      /* ScatterLayout */
      .kivy-scatterlayout {
        position: relative;
      }

      /* StackLayout */
      .kivy-stacklayout.horizontal {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .kivy-stacklayout.vertical {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }
    `;
  }

  /** Inject the CSS into the document head */
  inject() {
    if (!document.getElementById("kivy-layout-style")) {
      const style = document.createElement("style");
      style.id = "kivy-layout-style";
      style.innerHTML = this.css;
      document.head.appendChild(style);
    }
  }
}