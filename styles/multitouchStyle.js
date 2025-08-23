export class MultitouchStyle {
    constructor() {
        this.css = `/* Default styles for multitouch */
.multitouch-container {
    display: block;
}

.multitouch-header {
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    color: #333;
}

.multitouch-content {
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
