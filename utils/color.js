// utils/color.js
// Utility functions for color conversions and manipulations

/**
 * Convert HEX string (#rrggbb or #rgb) to RGB object
 * @param {string} hex - Color in hex format (#rrggbb or #rgb)
 * @returns {{r: number, g: number, b: number}}
 */
export function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map(h => h + h).join("");
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Convert RGB values to HEX string
 * @param {number} r - red [0–255]
 * @param {number} g - green [0–255]
 * @param {number} b - blue [0–255]
 * @returns {string} - hex string (#rrggbb)
 */
export function rgbToHex(r, g, b) {
  return "#" + [r, g, b]
    .map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Convert RGB to HSL
 * @param {number} r - red [0–255]
 * @param {number} g - green [0–255]
 * @param {number} b - blue [0–255]
 * @returns {{h:number, s:number, l:number}}
 */
export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h*360, s: s*100, l: l*100 };
}

/**
 * Convert HSL to RGB
 * @param {number} h - hue [0–360]
 * @param {number} s - saturation [0–100]
 * @param {number} l - lightness [0–100]
 * @returns {{r:number, g:number, b:number}}
 */
export function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return { r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255) };
}

/**
 * Lighten or darken a color
 * @param {string} hex - color hex (#rrggbb)
 * @param {number} amount - positive to lighten, negative to darken
 * @returns {string} - new hex color
 */
export function adjustBrightness(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r + amount, g + amount, b + amount);
}