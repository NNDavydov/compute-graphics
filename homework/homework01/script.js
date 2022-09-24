let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let size_x = 10;
let size_y = 10;

let cur_x = 0;
let cur_y = 0;

let speed_x = 5;

let color = "#000000"

// генериреуем случайный цвет
function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Изменяем цвет прямоугольника
function handler_keydown(event) {
    // нажатие клавиши "c"
    if (event.keyCode === 67) {
        console.log(color)
        color = generateColor();
        ctx.fillStyle = color;
    }
}

addEventListener("keydown", handler_keydown);

setInterval(function () {
    drawRectangle(cur_x, cur_y, size_x, size_y)
    if (cur_x >= canvas.width - size_x) {
        speed_x = -speed_x;
    } else if (cur_x < 0) {
        speed_x = -speed_x;
    }
    cur_x += speed_x;

}, 50);

// перерисовываем пряоугольник
function drawRectangle(x, y, widthEl, heightEl) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, y, widthEl, heightEl);
}
