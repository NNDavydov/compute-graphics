let canvas_original = document.getElementById('original');
let ctx_original = canvas_original.getContext('2d');

let canvas_filtered = document.getElementById('filtered');
let ctx_filtered = canvas_filtered.getContext('2d');


let img = new Image();
img.crossOrigin = "anonymus";
img.src = "https://habrastorage.org/files/9a5/f62/2a5/9a5f622a50eb47c3b586157516e6d685.png";

let width = canvas_original.width
let height = canvas_original.height

img.onload = function () {
    ctx_original.drawImage(img, 0, 0, width, height);

    let data_original = ctx_original.getImageData(0, 0, width, height);
    let data_filtered = ctx_filtered.createImageData(width, height);

    let row_size = 3;
    let col_size = 3;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let R = [];
            let G = [];
            let B = [];
            let S = [];

            for (let n = -col_size; n <= col_size; n++) {
                for (let m = -row_size; m <= row_size; m++) {
                    R.push(data_original.data[((j + m) * width + i + n) * 4]);
                    G.push(data_original.data[((j + m) * width + i + n) * 4 + 1]);
                    B.push(data_original.data[((j + m) * width + i + n) * 4 + 2]);
                    S.push(data_original.data[((j + m) * width + i + n) * 4 + 3]);
                }
            }


            R = R.filter(el => el !== undefined)
            R.sort((x, y) => x - y);

            console.log(R)

            G = G.filter(el => el !== undefined)
            G.sort((x, y) => x - y);

            B = B.filter(el => el !== undefined)
            B.sort((x, y) => x - y);

            S = S.filter(el => el !== undefined)
            S.sort((x, y) => x - y);

            data_filtered.data[(j * width + i) * 4] = R[Math.floor(R.length / 2)];
            data_filtered.data[(j * width + i) * 4 + 1] = G[Math.floor(G.length / 2)];
            data_filtered.data[(j * width + i) * 4 + 2] = B[Math.floor(B.length / 2)];
            data_filtered.data[(j * width + i) * 4 + 3] = S[Math.floor(S.length / 2)];

        }
    }
    ctx_filtered.putImageData(data_filtered, 0, 0, 0, 0, width, height);
}
