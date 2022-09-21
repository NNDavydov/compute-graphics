let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// 147, 123
let x1 = 247;
let y1 = 123;

let x0 = 0
let y0 = 0

let e = 0;
let y = 0;
context.fillRect(x0, y0, 1, 1);

for (var x = x0 + 1; x < x1; x++) {
    e = e + (y1 - y0) * 2;
    if (e > (x1 - x0)) {
        e = e - 2 * (x1 - x0);
        y = y + 1;
    }
    context.fillRect(x, y, 1, 1);
}

