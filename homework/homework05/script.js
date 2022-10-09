let canvas_original = document.getElementById('original');
let ctx_original = canvas_original.getContext('2d');

let canvas_median_filter = document.getElementById('median-filter');
let ctx_median_filter = canvas_median_filter.getContext('2d');

let canvas_gaussian_filter = document.getElementById('Gaussian-filter');
let ctx_gaussian_filter = canvas_gaussian_filter.getContext('2d');

let canvas_sobel_filter = document.getElementById('Sobel-filter');
let ctx_sobel_filter = canvas_sobel_filter.getContext('2d');

let img = new Image();
img.crossOrigin = "anonymus";
img.src = "https://habrastorage.org/files/9a5/f62/2a5/9a5f622a50eb47c3b586157516e6d685.png";

const width = canvas_original.width
const height = canvas_original.height

function median_filter(data_original) {
    let data_filtered = ctx_median_filter.createImageData(width, height);
    const row_size = 1;
    const col_size = 1;

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
    ctx_median_filter.putImageData(data_filtered, 0, 0, 0, 0, width, height);
}

function gaussian_filter(data_original) {
    let data_filtered = ctx_gaussian_filter.createImageData(width, height);
    const row_size = 1;
    const col_size = 1;

    const weights = [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ];
    const sum_weights = 16;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let R = 0;
            let G = 0;
            let B = 0;
            let S = 0;

            for (let n = -col_size; n <= col_size; n++) {
                for (let m = -row_size; m <= row_size; m++) {
                    R += data_original.data[((j + m) * width + i + n) * 4] * weights[col_size + n][row_size + m];
                    G += data_original.data[((j + m) * width + i + n) * 4 + 1] * weights[col_size + n][row_size + m];
                    B += data_original.data[((j + m) * width + i + n) * 4 + 2] * weights[col_size + n][row_size + m];
                    S += data_original.data[((j + m) * width + i + n) * 4 + 3] * weights[col_size + n][row_size + m];
                }
            }

            data_filtered.data[(j * width + i) * 4] = R / sum_weights;
            data_filtered.data[(j * width + i) * 4 + 1] = G / sum_weights;
            data_filtered.data[(j * width + i) * 4 + 2] = B / sum_weights;
            data_filtered.data[(j * width + i) * 4 + 3] = S / sum_weights;

        }
    }
    ctx_gaussian_filter.putImageData(data_filtered, 0, 0, 0, 0, width, height);
}

function sobel_filter(data_original) {
    function getGx(pixels, x, y) {
        let g = 0;
        for (let i = 0; i < 3; ++i) {
            g += ((
                    pixels.data[((y + 1) * width + x - 1) * 4 + i] +
                    pixels.data[((y + 1) * width + x) * 4 + i] * 2 +
                    pixels.data[((y + 1) * width + x + 1) * 4 + i]
                ) -
                (
                    pixels.data[((y - 1) * width + x - 1) * 4 + i] +
                    pixels.data[((y - 1) * width + x) * 4 + i] * 2 +
                    pixels.data[((y - 1) * width + x + 1) * 4 + i]
                ));
        }
        return g;
    }

    function getGy(pixels, x, y) {
        let g = 0;
        for (let i = 0; i < 3; ++i) {
            g += ((
                    pixels.data[((y - 1) * width + x + 1) * 4 + i] +
                    pixels.data[(y * width + x + 1) * 4 + i] * 2 +
                    pixels.data[((y + 1) * width + x + 1) * 4 + i]
                ) -
                (
                    pixels.data[((y - 1) * width + x - 1) * 4 + i] +
                    pixels.data[(y * width + x - 1) * 4 + i] * 2 +
                    pixels.data[((y + 1) * width + x - 1) * 4 + i]
                ));
        }
        return g;
    }

    let data_filtered = ctx_sobel_filter.createImageData(width, height);

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let g = Math.ceil(Math.sqrt(Math.pow(getGx(data_original, i, j), 2) + Math.pow(getGy(data_original, i, j), 2)));
            for (let x = 0; x < 3; ++x) {
                data_filtered.data[(j * width + i) * 4 + x] = g;
            }
            data_filtered.data[(j * width + i) * 4 + 3] = 255;
        }
    }

    ctx_sobel_filter.putImageData(data_filtered, 0, 0, 0, 0, width, height);
}

img.onload = function () {
    ctx_original.drawImage(img, 0, 0, width, height);
    let data_original = ctx_original.getImageData(0, 0, width, height);
    median_filter(data_original);
    gaussian_filter(data_original);
    sobel_filter(data_original);
}
