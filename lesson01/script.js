// получение контекста
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// Ширина прямоугольника
const widthEl = 20;
// Высота прямоугольника
const heightEl = 20;

// Рисуем две шахматные доски
drawChessField(context, 20, 20, widthEl, heightEl);
drawChessField(context, 200, 20, widthEl, heightEl);

// текущие координаты для разноцветного прямоугольника
let curr_x = 20;
let curr_y = 200;

// каждые 100 мс рисуем прямоугольник случайного цвета
let timerId = setInterval(() => {
    drawMulticoloredRectangle(context, curr_x, curr_y, widthEl, heightEl);

    curr_x += widthEl;
    if (curr_x === 360){
        curr_x = 20;
        curr_y += heightEl;
        if (curr_y === 360) curr_y = 200;
    }
}, 100);

// через 15 секунд останавливаем
setTimeout(() => { clearInterval(timerId);}, 15000);

function drawChessField(context, marginLeft, margitTop, widthEl, heightEl) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 === 0) context.fillStyle = "#000000";
            else context.fillStyle = "#7c7c7c";
            context.fillRect(widthEl * i + marginLeft, heightEl * j + margitTop, widthEl, heightEl);
        }
    }
}

function drawMulticoloredRectangle(context, x, y, widthEl, heightEl) {
    context.fillStyle = generateColor();
    context.fillRect(x, y, widthEl, heightEl);
}

function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
