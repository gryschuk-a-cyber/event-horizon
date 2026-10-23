const starsCanvas = document.getElementById("space");
const starsCtx = starsCanvas.getContext("2d");

const gargantuaCanvas =
document.getElementById("gargantua");

const gctx =
gargantuaCanvas.getContext("2d");

function resize() {

    starsCanvas.width =
    window.innerWidth;

    starsCanvas.height =
    window.innerHeight;

    gargantuaCanvas.width =
    window.innerWidth;

    gargantuaCanvas.height =
    window.innerHeight;
}

resize();

window.addEventListener(
    "resize",
    resize
);

/* ---------- ЗОРІ ---------- */

const stars = [];

function generateStars() {

    stars.length = 0;

    for(let i=0;i<900;i++) {

        stars.push({

            x:
            Math.random() *
            starsCanvas.width,

            y:
            Math.random() *
            starsCanvas.height,

            r:
            Math.random() * 2,

            a:
            0.2 +
            Math.random() * 0.8

        });
    }
}

generateStars();

window.addEventListener(
    "resize",
    generateStars
);

function drawStars() {

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
            Math.PI * 2
        );

        starsCtx.fill();

    }

    requestAnimationFrame(
        drawStars
    );
}

drawStars();

/* ---------- ГАРГАНТЮА ---------- */

function drawGargantua(){

    gctx.clearRect(
        0,
        0,
        gargantuaCanvas.width,
        gargantuaCanvas.height
    );

    const cx =
    gargantuaCanvas.width / 2;

    const cy =
    gargantuaCanvas.height / 2;

    const r =
    Math.min(
        gargantuaCanvas.width,
        gargantuaCanvas.height
    ) * 0.10;

    const glow =
    gctx.createRadialGradient(
        cx,
        cy,
        r,
        cx,
        cy,
        r * 2
    );

    glow.addColorStop(
        0,
        "rgba(255,180,80,0)"
    );

    glow.addColorStop(
        0.5,
        "rgba(255,180,80,0.18)"
    );

    glow.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    gctx.fillStyle = glow;

    gctx.beginPath();

    gctx.arc(
        cx,
        cy,
        r * 2,
        0,
        Math.PI * 2
    );

    gctx.fill();
        /* ФОТОННЕ КІЛЬЦЕ */

    for(let i=0;i<6;i++){

        gctx.beginPath();

        gctx.arc(
            cx,
            cy,
            r * 1.01 + i * 0.5,
            0,
            Math.PI * 2
        );

        gctx.strokeStyle =
        `rgba(
            255,
            220,
            150,
            ${0.09 - i*0.01}
        )`;

        gctx.lineWidth = 2;

        gctx.stroke();

    }

    /* ПЕРЕДНЯ ЧАСТИНА ДИСКА */

    for(let i=0;i<12;i++){

        gctx.beginPath();

        gctx.strokeStyle =
        `rgba(
            255,
            235,
            180,
            ${0.05 + i*0.015}
        )`;

        gctx.lineWidth =
        1 + i*0.4;

        gctx.ellipse(
            cx,
            cy + r*0.15,
            r*2.0 + i*1.2,
            r*0.06 + i*0.015,
            0,
            Math.PI*0.1,
            Math.PI*0.9
        );

        gctx.stroke();

    }

    requestAnimationFrame(
        drawGargantua
    );

}

drawGargantua();

/* ---------- ПЛАНЕТИ ---------- */

const nuclear =
document.querySelector(".nuclear");

const semiconductor =
document.querySelector(".semiconductor");

const mechanics =
document.querySelector(".mechanics");

const radio =
document.querySelector(".radio");

function setPlanet(
    element,
    x,
    y
){

    element.style.left =
    (x - element.offsetWidth/2)
    + "px";

    element.style.top =
    (y - element.offsetHeight/2)
    + "px";
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
        cx - 320 +
        Math.cos(t*2.4)*35,

        cy + 140 +
        Math.sin(t*2.4)*15
    );

    setPlanet(
        semiconductor,
        cx - 140 +
        Math.cos(t*2.2)*28,

        cy - 100 +
        Math.sin(t*2.2)*15
    );

    setPlanet(
        mechanics,
        cx + 260 +
        Math.cos(t*1.8)*25,

        cy + 90 +
        Math.sin(t*1.8)*15
    );

    setPlanet(
        radio,
        cx + 430 +
        Math.cos(t*1.6)*20,

        cy - 90 +
        Math.sin(t*1.6)*10
    );

    requestAnimationFrame(
        animatePlanets
    );
}

animatePlanets();
