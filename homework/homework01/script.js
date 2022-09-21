let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let i = 0;
let direction = 1;

let up_down = 0;
let k = 0;
let color = "#ff0000"

document.addEventListener("keydown", function (event) { // отвечает за передвежение
    if (event.code === "ArrowRight") {
        direction = 1;
        up_down = 0;
    } else if (event.code === "ArrowLeft") {
        direction = -1;
        up_down = 0;
    }

    if (event.code === "ArrowDown") {
        up_down = -1;
        direction = 0;
    } else if (event.code === "ArrowUp") {
        up_down = 1;
        direction = 0;
    }
    if (event.code === "click") {
        color = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
    }


});

document.addEventListener("click", function (event) {
    if (event.which === 1) {
        color = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
    }
});

setInterval(function () { //отвечает за фигуру и её перемещение
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.fillRect(50 + i, 50 - k, 100, 100);
    i += direction;
    k += up_down;
}, 10);

