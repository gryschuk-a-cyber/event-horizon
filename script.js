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

/* ---------- ЗІРКИ ---------- */

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
    ) * 0.12;

       /* ПЕРЕДНЯ ВИДИМА ЧАСТИНА ДИСКА */

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
            cy + r*0.12,
            r*2.15 + i,
            r*0.012 + i*0.006,
            0,
            Math.PI * 0.15,
            Math.PI * 0.85
        );

        gctx.stroke();

    }

    requestAnimationFrame(
        drawGargantua
    );

}

drawGargantua();

/* ---------- ОБ'ЄКТИ ---------- */

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
        cx - 150 + Math.cos(t*0.8)*15,
        cy - 110
    );

    setPlanet(
        mechanics,
        cx + 260 + Math.sin(t*0.5)*15,
        cy + 90
    );

    setPlanet(
        radio,
        cx + 430 + Math.cos(t*0.3)*10,
        cy - 90
    );

    setPlanet(
        video,
        cx + Math.cos(t*3.8)*170,
        cy + Math.sin(t*3.8)*60
    );

    requestAnimationFrame(
        animatePlanets
    );

}

animatePlanets();
