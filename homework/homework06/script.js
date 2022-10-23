let canvas_original = document.getElementById('original');
let ctx = canvas_original.getContext('2d');

function getPointCode(x_point, y_point, x_left, x_right, y_up, y_down) {
    let code_point = 0;

    if (x_point < x_left) code_point += 2;
    else if (x_point > x_right) code_point += 1;

    if (y_point < y_up) code_point += 8;
    else if (y_point > y_down) code_point += 4;

    return code_point;
}

function getMiddlePoint(x0, y0, x1, y1) {
    return [Math.floor((x0 + x1) / 2), Math.floor((y0 + y1) / 2)];
}

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

function algorithmCohenSutherland(x0, y0, x1, y1, x_left, x_right, y_up, y_down) {
    let code_point0 = getPointCode(x0, y0, x_left, x_right, y_up, y_down);
    let code_point1 = getPointCode(x1, y1, x_left, x_right, y_up, y_down);

    if (code_point0 === 0 && code_point1 === 0) {
        drawLine(x0, y0, x1, y1);
    } else if ((code_point0 & code_point1) === 0) {
        if (Math.abs(x0 - x1) < 2 && Math.abs(y0 - y1) < 2) return;
        let middle_point = getMiddlePoint(x0, y0, x1, y1);
        algorithmCohenSutherland(middle_point[0], middle_point[1], x1, y1, x_left, x_right, y_up, y_down);
        algorithmCohenSutherland(x0, y0, middle_point[0], middle_point[1], x_left, x_right, y_up, y_down);
    }
}


x_left = 90;
x_right = 180;
y_up = 100;
y_down = 300;
algorithmCohenSutherland(0, 0, 400, 400, x_left, x_right, y_up, y_down);
