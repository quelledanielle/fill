(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const
  Color = require('../src/color'),
  Image = require('../src/image'),
  Point = require('../src/point'),
  fill = require('../src/fill');

function drawToCanvas(image) {
  let canvas = document.getElementById('image');
  if (canvas) {
    let ctx = canvas.getContext('2d');

    canvas.height = image.height;
    canvas.width = image.width;

    image.grid.forEach((row, row_i) => {
      row.forEach((color, col_i) => {
        ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.fillRect(col_i, row_i, 1, 1);
      });
    });
  }
}

let b = new Color(0, 0, 0);
let w = new Color(255, 255, 255);
let m = new Color(255, 0, 255);

let image = new Image([
  [w, w, w, w, w],
  [w, b, w, b, w],
  [w, w, w, w, w],
  [w, b, b, b, w],
  [w, w, w, w, w],
]);

let start = new Point(2, 2);

fill(image, start, m);
drawToCanvas(image);

},{"../src/color":2,"../src/fill":3,"../src/image":4,"../src/point":5}],2:[function(require,module,exports){
class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  matches(other) {
    return this.r === other.r
      && this.g === other.g
      && this.b === other.b;
  }
}

module.exports = Color;

},{}],3:[function(require,module,exports){
const
  Color = require('./color'),
  Image = require('./image'),
  Point = require('./point');

function fill(image, start, color) {
  if (!image.contains(start)) {
    return;
  }

  let startColor = image.valueAt(start);
  let queue = [];
  queue.push(start);

  while (queue.length > 0) {
    let point = queue.shift();
    if (!image.contains(point)) {
      continue;
    }

    let pointColor = image.valueAt(point);
    if (pointColor.matches(color)) {
      continue;
    }

    if (pointColor.matches(startColor)) {
      image.setValueAt(point, color);
      Array.prototype.push.apply(queue, point.neighbors);
    }
  }
}

module.exports = fill;

},{"./color":2,"./image":4,"./point":5}],4:[function(require,module,exports){
class Image {
  constructor(grid) {
    this.grid = grid;
  }

  get height() {
    return this.grid.length;
  }

  get width() {
    if (this.height) {
      return this.grid[0].length;
    } else {
      return 0;
    }
  }

  contains(point) {
    if (point.y < 0 || point.y >= this.height) {
      return false;
    }

    if (point.x < 0 || point.x >= this.width) {
      return false;
    }

    return true;
  }

  valueAt(point) {
    if (this.contains(point)) {
      return this.grid[point.y][point.x];
    } else {
      return null;
    }
  }

  setValueAt(point, value) {
    if (this.contains(point)) {
      this.grid[point.y][point.x] = value;
    }
  }
}

module.exports = Image;

},{}],5:[function(require,module,exports){
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get neighbors() {
    let x = this.x;
    let y = this.y;
    return [
      new Point(x, y - 1),
      new Point(x + 1, y),
      new Point(x, y + 1),
      new Point(x - 1, y),
    ];
  }
}

module.exports = Point;

},{}]},{},[1]);
