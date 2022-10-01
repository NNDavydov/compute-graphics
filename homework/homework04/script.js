let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;
let radius = width / 5;

let centre_x = width / 4;
let centre_y = height / 4;

function draw_circle(x, y, radius) {
    let disp_x = x;
    let disp_y = y;
    x = 0;
    y = radius;

    let delta = 1 - 2 * radius;
    let error = 0;

    while (y >= 0) {
        ctx.fillRect(disp_x + x, disp_y + y, 1, 1);
        ctx.fillRect(disp_x + x, disp_y - y, 1, 1);
        ctx.fillRect(disp_x - x, disp_y + y, 1, 1);
        ctx.fillRect(disp_x - x, disp_y - y, 1, 1);

        error = 2 * (delta + y) - 1;
        if (delta < 0 && error <= 0) {
            x += 1;
            delta += 2 * x + 1;
            continue;
        }
        error = 2 * (delta - x) - 1;
        if (delta > 0 && error > 0) {
            y -= 1;
            delta += 1 - 2 * y;
            continue;
        }
        x += 1;
        delta += 2 * (x - y);
        y -= 1;
    }
}

draw_circle(centre_x, centre_y, radius);
