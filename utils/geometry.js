// utils/geometry.js
// Geometry + math helpers for kivy.js

/**
 * Represents a rectangle
 */
export class Rect {
  constructor(x, y, width, height) {
    this.x = x; this.y = y;
    this.width = width; this.height = height;
  }

  get left()   { return this.x; }
  get right()  { return this.x + this.width; }
  get top()    { return this.y; }
  get bottom() { return this.y + this.height; }

  containsPoint(px, py) {
    return (px >= this.left && px <= this.right &&
            py >= this.top  && py <= this.bottom);
  }

  intersects(other) {
    return !(other.left > this.right ||
             other.right < this.left ||
             other.top > this.bottom ||
             other.bottom < this.top);
  }
}

/**
 * Represents a circle
 */
export class Circle {
  constructor(x, y, radius) {
    this.x = x; this.y = y;
    this.radius = radius;
  }

  containsPoint(px, py) {
    return distance(this.x, this.y, px, py) <= this.radius;
  }

  intersects(other) {
    if (other instanceof Circle) {
      return distance(this.x, this.y, other.x, other.y) <= (this.radius + other.radius);
    }
    if (other instanceof Rect) {
      let closestX = clamp(this.x, other.left, other.right);
      let closestY = clamp(this.y, other.top, other.bottom);
      return distance(this.x, this.y, closestX, closestY) <= this.radius;
    }
    return false;
  }
}

/**
 * Vector math
 */
export class Vector2 {
  constructor(x, y) { this.x = x; this.y = y; }

  add(v) { return new Vector2(this.x + v.x, this.y + v.y); }
  sub(v) { return new Vector2(this.x - v.x, this.y - v.y); }
  scale(s) { return new Vector2(this.x * s, this.y * s); }
  dot(v) { return this.x * v.x + this.y * v.y; }
  length() { return Math.sqrt(this.x * this.x + this.y * this.y); }
  normalize() {
    let len = this.length();
    return len > 0 ? new Vector2(this.x / len, this.y / len) : new Vector2(0,0);
  }
}

/**
 * Utilities
 */
export function distance(x1, y1, x2, y2) {
  let dx = x2 - x1, dy = y2 - y1;
  return Math.sqrt(dx*dx + dy*dy);
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function midpoint(x1, y1, x2, y2) {
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
}

export function boundingBox(points) {
  let xs = points.map(p => p.x);
  let ys = points.map(p => p.y);
  let minX = Math.min(...xs), maxX = Math.max(...xs);
  let minY = Math.min(...ys), maxY = Math.max(...ys);
  return new Rect(minX, minY, maxX - minX, maxY - minY);
}