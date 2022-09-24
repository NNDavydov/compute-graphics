let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


let width = canvas.width;
let height = canvas.height;
let radius = width / 4;

ctx.beginPath();
ctx.arc(width / 4, height / 4, radius, 0, 2 * Math.PI);
ctx.stroke();

let angle = 0;
let centre_x = width / 4;
let centre_y = height / 4;


function drawLine(x0, y0, x1, y1) {
    let dy = y1 - y0;
    let dx = x1 - x0;

    let sign_x = dx > 0 ? 1 : dx < 0 ? -1 : 0;
    let sign_y = dy > 0 ? 1 : dy < 0 ? -1 : 0;


    if (dx < 0) dx = -dx;
    if (dy < 0) dy = -dy;

    let pdx, pdy, es, el;
    if (dx > dy) {
        pdx = sign_x;
        pdy = 0;
        es = dy;
        el = dx;
    } else {
        pdx = 0;
        pdy = sign_y;
        es = dx;
        el = dy;
    }

    let e = el / 2;
    let t = 0;
    let x = x0;
    let y = y0;

    ctx.fillRect(x, y, 1, 1);
    while (t < el) {
        console.log(e)
        e -= es;
        if (e < 0) {
            e += el;
            x += sign_x;
            y += sign_y;
        } else {
            x += pdx;
            y += pdy;
        }
        t += 1;
        ctx.fillRect(x, y, 1, 1);
    }

}

setInterval(() => {
    drawLine(centre_x, centre_y, centre_x + radius * Math.sin(angle), centre_y + radius * Math.cos(angle));
    angle += Math.PI / 60;
}, 1000);