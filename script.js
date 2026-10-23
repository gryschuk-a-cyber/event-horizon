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

window.addEventListener(
    "resize",
    resize
);

/* -------- ЗОРІ -------- */

const stars = [];

function createStars() {

    stars.length = 0;

    for(let i=0;i<1200;i++){

        stars.push({

            x:Math.random()*starsCanvas.width,
            y:Math.random()*starsCanvas.height,

            r:Math.random()*2.2,

            a:0.2+Math.random()*0.8

        });

    }

}

createStars();

window.addEventListener(
    "resize",
    createStars
);

function drawStars(){

    starsCtx.clearRect(
        0,
        0,
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
            Math.PI*2
        );

        starsCtx.fill();

    }

    requestAnimationFrame(
        drawStars
    );

}

drawStars();

/* -------- ГАРГАНТЮА -------- */

function drawGargantua(){

    gctx.clearRect(
        0,
        0,
        gargantuaCanvas.width,
        gargantuaCanvas.height
    );

    const cx =
        gargantuaCanvas.width/2;

    const cy =
        gargantuaCanvas.height/2;

    const r =
        Math.min(
            gargantuaCanvas.width,
            gargantuaCanvas.height
        ) * 0.12;

    /* гравітаційне лінзування */

    const glow =
    gctx.createRadialGradient(
        cx,
        cy,
    /* ПЕРЕДНЯ ЧАСТИНА ДИСКА */

    for(let i=0;i<10;i++){

        gctx.beginPath();

        gctx.strokeStyle =
        `rgba(
            255,
            235,
            180,
            ${0.04 + i*0.015}
        )`;

        gctx.lineWidth =
            1 + i*0.5;

        gctx.ellipse(
            cx,
            cy + r*0.18,
            r*2.2 + i*1.5,
            r*0.018 + i*0.01,
            0,
            0,
            Math.PI*2
        );

        gctx.stroke();

    }

    requestAnimationFrame(
        drawGargantua
    );

}

drawGargantua();

/* -------- ОБ'ЄКТИ -------- */

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

    const cx =
    window.innerWidth/2;

    const cy =
    window.innerHeight/2;

    const t =
    performance.now()/1000;

    setPlanet(
        nuclear,
        cx - 330 + Math.cos(t)*20,
        cy + 140
    );

    setPlanet(
        semiconductor,
        cx - 120 + Math.cos(t*0.8)*15,
        cy - 90
    );

    setPlanet(
        mechanics,
        cx + 260 + Math.sin(t*0.5)*15,
        cy + 90
    );

    setPlanet(
        radio,
        cx + 430 + Math.cos(t*0.3)*10,
        cy - 70
    );

    setPlanet(
        video,
        cx + Math.cos(t*3.8)*150,
        cy + Math.sin(t*3.8)*40
    );

    requestAnimationFrame(
        animatePlanets
    );

}

animatePlanets();
