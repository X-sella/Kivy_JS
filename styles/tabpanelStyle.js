export class TabpanelStyle {
    constructor() {
        this.css = `/* Default styles for tabpanel */
.tabpanel-container {
    display: block;
}

.tabpanel-header {
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    color: #333;
}

.tabpanel-content {
    display: none;
    background-color: #fafafa;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
`;
    }

    getCSS() {
        return this.css;
    }
}
