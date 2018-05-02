const paper = document.getElementById("paper");
const ctx = paper.getContext("2d");
let w = document.body.clientWidth - 4;
let h = document.body.clientHeight - 4;
let mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
let start = mobile ? "touchstart" : "mousedown";
let end = mobile ? "touchend" : "mouseup";
token = false;
onState = false;
let r = 29;
let g = 41;
let b = 48;

setTimeout(() => {
    document.getElementById("title").classList.remove("fadeIn");
    document.getElementById("title").classList.add("fadeOut");
}, 5000);

function info() {
    alert("click or tap anywhere on the screen to generate a spiral. Click once again to stop the spiral from generating.");
}

paper.setAttribute("width", w);
paper.setAttribute("height", h);

function GoldRect(val, el) {
    if (val === 'w') {
        var height = (-1 / 2 - (1 / 2) * Math.sqrt(5)) * el * -1;
        return height.toFixed(2);
    }
    if (val === 'h') {
        var width = -1 * (-(2 * el) / (1 + Math.sqrt(5)));
        return width.toFixed(2);
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let ranNum = getRandomIntInclusive(0, 255);
let opacity = 1;

function getColor() {
    return "rgb(" + getRandomIntInclusive(50, 255) + "," + getRandomIntInclusive(50, 255) + "," + getRandomIntInclusive(50, 255) + ")";
}

function dwnload() {
    let download = document.querySelector(".download-container");
    let image = document.getElementById("paper").toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

function render(el, a, b, c, d, color1, color2) {

    if (el % 2 === 0) {
        opacity = opacity / 1.01
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(el, el);
        ctx.lineTo(GoldRect("h", el), el);
        ctx.rotate((a) * Math.PI / 180);
        ctx.lineTo(GoldRect("w", el), el);
        ctx.rotate((b) * Math.PI / 180);
        ctx.strokeStyle = color1;
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(el, el);
        ctx.lineTo(GoldRect("h", el), el);
        ctx.rotate((c) * Math.PI / 180);
        ctx.lineTo(GoldRect("w", el), el);
        ctx.rotate((d) * Math.PI / 180);
        ctx.strokeStyle = color2;
        ctx.stroke();
    }


}

function reset() {
    clearInterval(period);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, paper.width, paper.height);
    ctx.restore();
    token = false;
    ctx.globalAlpha = 1;
    opacity = 1;
}


function flashScreen() {
    let flash = setInterval(function () {
        document.getElementById("page").style.background = "rgb(" + r + "," + g + "," + b + ")";

        r--;
        g--;
        b--;

        if (r === 19) {
            clearInterval(flash);
            r = 29;
            g = 41;
            b = 48;
        }
    }, 24);
}

function flashBlue() {
    let flashB = setInterval(function () {
        document.getElementById("page").style.background = "rgb(" + r + "," + g + "," + b + ")";

        r--;
        g--;

        if (r === 19) {
            clearInterval(flashB);
            r = 29;
            g = 41;
            b = 48;
        }
    }, 24);
}

document.getElementById("page").addEventListener(start, function (e) {
    e.preventDefault();
    // alert(e.touches[0].pageX+" "+ e.touches[0].pageY);
    if (token === false) {
        if (onState === false) {
            onState = true;
            flashBlue();

            ctx.translate(e.clientX || e.touches[0].pageX, e.clientY || e.touches[0].pageY);
            ctx.scale(0.4, 0.4);
            let i = 2;
            let a = getRandomIntInclusive(1, 180);
            let b = getRandomIntInclusive(1, 180);
            let c = getRandomIntInclusive(1, 180);
            let d = getRandomIntInclusive(1, 180);

            let col1 = getColor();
            let col2 = getColor()

            period = setInterval(function () {
                render(i, a, b, c, d, col1, col2);
                i += 1;
            }, 10);
        } else {
            clearInterval(period);
            token = true;
            ctx.globalAlpha = 1;
            opacity = 1;
            flashScreen();
        }


    } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.restore();
        ctx.translate(e.clientX || e.touches[0].pageX, e.clientY || e.touches[0].pageY);
        ctx.scale(0.4, 0.4);
        flashBlue();
        let i = 2;
        let a = getRandomIntInclusive(1, 180);
        let b = getRandomIntInclusive(1, 180);
        let c = getRandomIntInclusive(1, 180);
        let d = getRandomIntInclusive(1, 180);

        let col1 = getColor();
        let col2 = getColor()

        period = setInterval(function () {
            render(i, a, b, c, d, col1, col2);
            i += 1;
        }, 10);
        token = false;
    }
});
