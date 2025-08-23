import os

# Folder where styles will be created
styles_folder = "/storage/emulated/0/code/kivyjs/styles"

# Make sure the folder exists
os.makedirs(styles_folder, exist_ok=True)

# List of widgets (add all 23+ here)
widgets = [
    "button",
    "label",
    "togglebutton",
    "checkbox",
    "switch",
    "slider",
    "progressbar",
    "spinner",
    "dropdown",
    "textinput",
    "image",
    "video",
    "audio",
    "filechooser",
    "colorpicker",
    "popup",
    "scrollview",
    "recycleview",
    "listview",
    "tabpanel",
    "accordion",
    "separator",
    "multitouch",
    "webview"
]

# Template CSS for each widget
css_template = """/* Default styles for {widget} */
.{widget}-container {{
    display: block;
}}

.{widget}-header {{
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    color: #333;
}}

.{widget}-content {{
    display: none;
    background-color: #fafafa;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}}
"""

# Generate CSS files
for widget in widgets:
    css_file_path = os.path.join(styles_folder, f"{widget}Style.js")
    with open(css_file_path, "w") as f:
        content = f"""export class {widget.capitalize()}Style {{
    constructor() {{
        this.css = `{css_template.format(widget=widget)}`;
    }}

    getCSS() {{
        return this.css;
    }}
}}
"""
        f.write(content)

print(f"CSS files for {len(widgets)} widgets created in {styles_folder}")
