const starsCanvas = document.getElementById("space");
const starsCtx = starsCanvas.getContext("2d");

const gargantuaCanvas = document.getElementById("gargantua");
const gctx = gargantuaCanvas.getContext("2d");

function resize() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;

    gargantuaCanvas.width = window.innerWidth;
    gargantuaCanvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

/* -------------------- ЗІРКИ -------------------- */

const stars = [];

function createStars() {

    stars.length = 0;

    for (let i = 0; i < 1200; i++) {

        stars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height,
            r: Math.random() * 2.2,
            a: 0.2 + Math.random() * 0.8
        });

    }
}

createStars();

window.addEventListener("resize", createStars);

function drawStars() {

    starsCtx.clearRect(
        0,0,
        starsCanvas.width,
        starsCanvas.height
    );

    for(const star of stars){

        starsCtx.beginPath();

        starsCtx.fillStyle =
            `rgba(255,255,255,${star.a})`;

        starsCtx.arc(
            star.x,
            star.y,
            star.r,
            0,
            Math.PI * 2
        );

        starsCtx.fill();
    }

    requestAnimationFrame(drawStars);
}

drawStars();

/* -------------------- ГАРГАНТЮА -------------------- */

function drawGargantua() {

    gctx.clearRect(
        0,
        0,
        gargantuaCanvas.width,
        gargantuaCanvas.height
    );

    const cx = gargantuaCanvas.width / 2;
    const cy = gargantuaCanvas.height / 2;

    const r =
        Math.min(
            gargantuaCanvas.width,
            gargantuaCanvas.height
        ) * 0.12;

    /* гравітаційне лінзування */

    const glow = gctx.createRadialGradient(
        cx,
        cy,
        r * 1.05,
        cx,
        cy,
        r * 2.2
    );

    glow.addColorStop(0,"rgba(255,220,180,0)");
    glow.addColorStop(0.35,"rgba(255,200,120,0.18)");
    glow.addColorStop(1,"rgba(0,0,0,0)");

    gctx.fillStyle = glow;

    gctx.beginPath();
    gctx.arc(
        cx,
        cy,
        r * 2.1,
        0,
        Math.PI * 2
    );
    gctx.fill();

    /* ЗАДНЯ ДУГА АКРЕЦІЙНОГО ДИСКА */

    for(let i=0;i<25;i++){

        gctx.beginPath();

        gctx.strokeStyle =
        `rgba(
            255,
            220,
            140,
            ${0.015 + i*0.01}
        )`;

        gctx.lineWidth = 2 + i;

        gctx.ellipse(
            cx,
            cy,
            r*2.8 + i*3,
            r*0.42 + i*0.25,
            0,
            0,
            Math.PI*2
        );

        gctx.stroke();

    }

    /* ВЕРХНЄ ВІДОБРАЖЕННЯ ДИСКА */

    for(let i=0;i<18;i++){

        gctx.beginPath();

        gctx.strokeStyle =
        `rgba(
            255,
            255,
            220,
            ${0.012 + i*0.012}
        )`;

        gctx.lineWidth = 1 + i*0.4;

        gctx.ellipse(
            cx,
            cy - r*0.9,
            r*1.2 + i,
            r*0.12 + i*0.08,
            0,
            0,
            Math.PI*2
        );

        gctx.stroke();

    }

    /* горизонт подій */

    gctx.beginPath();

    gctx.arc(
        cx,
        cy,
        r,
        0,
        Math.PI*2
    );

    gctx.fillStyle = "#000";
    gctx.fill();

    /* фотонне кільце */

    gctx.beginPath();

    gctx.arc(
        cx,
        cy,
        r*1.03,
        0,
        Math.PI*2
    );

    gctx.lineWidth = 3;

    gctx.strokeStyle =
        "rgba(255,220,140,0.4)";

    gctx.stroke();

    /* ПЕРЕДНЯ ЧАСТИНА ДИСКА */

    for(let i=0;i<15;i++){

        gctx.beginPath();

        gctx.strokeStyle =
        `rgba(
            255,
            235,
            180,
            ${0.03 + i*0.02}
        )`;

        gctx.lineWidth = 1 + i;

        gctx.ellipse(
            cx,
            cy + r*0.95,
            r*2.6 + i*3,
            r*0.08 + i*0.05,
            0,
            0,
            Math.PI*2
        );

        gctx.stroke();

    }

    requestAnimationFrame(drawGargantua);
}

drawGargantua();

/* -------------------- ОБ'ЄКТИ -------------------- */

const nuclear =
document.querySelector(".nuclear");

const semiconductor =
document.querySelector(".semiconductor");

const mechanics =
document.querySelector(".mechanics");

const radio =
document.querySelector(".radio");

const video =
document.querySelector(".video");

function setPlanet(el,x,y){

    el.style.left =
        (x - el.offsetWidth/2) + "px";

    el.style.top =
        (y - el.offsetHeight/2) + "px";
}

function animatePlanets(){

    const cx = window.innerWidth/2;
    const cy = window.innerHeight/2;

    const t = performance.now()/1000;

    setPlanet(
        nuclear,
        cx - 330 + Math.cos(t)*20,
        cy + 140
    );

    setPlanet
