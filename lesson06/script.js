let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function draw_line(P0, P1) {
    ctx.beginPath()
    ctx.moveTo(P0.x, P0.y)
    ctx.lineTo(P1.x, P1.y)
    ctx.stroke()
}

function get_distance(P0, P1, P2) {
    let N = Math.sqrt(Math.pow((P1.x - P2.x), 2) + Math.pow((P1.y - P2.y), 2))
    let k = ((P0.x - P1.x) * (P0.y - P2.y) - (P0.y - P1.y) * (P0.x - P2.x)) / (Math.pow((P0.x - P2.x), 2) - Math.pow((P0.y - P2.y), 2))
    return Math.abs(k * N)
}


function draw(P0, P1, P2) {
    if (get_distance(P0, P1, P2) < 1) {
        console.log(P0)
        console.log(P1)
        console.log(P2)
        draw_line(P0, P2)
        return
    }
    let P0_1 = {
        x: 0,
        y: 0
    }

    let P1_1 = {
        x: 0,
        y: 0
    }

    let P0_2 = {
        x: 0,
        y: 0
    }

    P0_1.x = (P0.x + P1.x) * 0.5
    P0_1.y = (P0.y + P1.y) * 0.5
    P1_1.x = (P2.x + P1.x) * 0.5
    P1_1.y = (P2.y + P1.y) * 0.5
    P0_2.x = (P0_1.x + P1_1.x) * 0.5
    P0_2.y = (P0_1.y + P1_1.y) * 0.5

    draw(P0, P0_1, P0_2)
    draw(P0_2, P1_1, P2)
}

P0 = {
    x: 100,
    y: 100
}

P1 = {
    x: 300,
    y: 400
}

P2 = {
    x: 400,
    y: 200
}

draw(P0, P1, P2)