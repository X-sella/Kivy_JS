// kivy.js
// Auto-loader for all Kivy_JS modules from GitHub repo

const GITHUB_USER = "X-sella";
const GITHUB_REPO = "Kivy_JS";
const BRANCH = "main";

async function loadModules() {
  window.Kivy = {}; // namespace

  // 1. Get file list from GitHub API
  const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents?ref=${BRANCH}`;
  const files = await fetch(apiUrl).then(r => r.json());

  // 2. Recursively walk repo for .js files
  async function walk(dir) {
    for (let f of dir) {
      if (f.type === "dir") {
        const sub = await fetch(f.url).then(r => r.json());
        await walk(sub);
      } else if (f.type === "file" && f.name.endsWith(".js") && f.name !== "kivy.js") {
        const code = await fetch(f.download_url).then(r => r.text());
        const module = await import(`data:text/javascript;base64,${btoa(code)}`);
        const name = f.name.replace(".js", "");
        const className = name.charAt(0).toUpperCase() + name.slice(1);
        if (module[className]) {
          window.Kivy[className] = module[className];
        }
      }
    }
  }

  await walk(files);

  console.log("Kivy modules loaded:", Object.keys(window.Kivy));
}

loadModules();
