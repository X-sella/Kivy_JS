import os

# --- CONFIG ---
BASE_DIR = "/storage/emulated/0/code/kivyjs"
FOLDERS = {
    "core": True,
    "widgets": True,
    "layouts": True,
    "behaviors": True,
    "utils": True,  # True if you want __init__.js
    "styles": True
}
CDN_FILENAME = "kivy.js"

# --- HELPERS ---
def js_safe_name(filename):
    name = os.path.splitext(filename)[0]
    if name.lower() == "image":
        return "ImageWidget"
    if name.lower() == "multitouch":
        return "MultiTouch"
    return name[0].upper() + name[1:]

def remove_file(path):
    if os.path.exists(path):
        os.remove(path)
        print(f"[REMOVE] {path}")

def create_init(folder_path):
    files = [f for f in os.listdir(folder_path) if f.endswith(".js")]
    if len(files) <= 1:
        return  # No init needed for single file

    init_path = os.path.join(folder_path, "__init__.js")
    remove_file(init_path)

    lines = []
    for f in files:
        name = js_safe_name(f)
        lines.append(f'export {{ {name} }} from "./{f}";')
    with open(init_path, "w") as fp:
        fp.write("\n".join(lines))
    print(f"[INIT] Created {init_path}")

def generate_index_js(base_dir):
    index_path = os.path.join(base_dir, "index.js")
    remove_file(index_path)

    lines = []
    for folder, use_init in FOLDERS.items():
        folder_path = os.path.join(base_dir, folder)
        if not os.path.isdir(folder_path):
            continue
        var_name = folder.capitalize()
        import_path = f"./{folder}/index.js" if use_init else f"./{folder}/*.js"
        lines.append(f"import * as {var_name} from './{folder}/index.js';")

    lines.append("\nwindow.Kivy = {")
    for folder in FOLDERS.keys():
        var_name = folder.capitalize()
        lines.append(f"  ...{var_name},")
    lines.append("  Styles")
    lines.append("};\n")

    with open(index_path, "w") as fp:
        fp.write("\n".join(lines))
    print(f"[INDEX] Created {index_path}")

def generate_kivy_js(base_dir):
    kivy_path = os.path.join(base_dir, CDN_FILENAME)
    remove_file(kivy_path)

    index_path = os.path.join(base_dir, "index.js")
    with open(index_path) as f:
        content = f.read()

    with open(kivy_path, "w") as f:
        f.write(content)
    print(f"[CDN] Created {kivy_path}")

# --- MAIN ---
for folder, use_init in FOLDERS.items():
    folder_path = os.path.join(BASE_DIR, folder)
    if use_init and os.path.isdir(folder_path):
        create_init(folder_path)

generate_index_js(BASE_DIR)
generate_kivy_js(BASE_DIR)
