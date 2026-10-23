const starsCanvas =
document.getElementById("space");

const starsCtx =
starsCanvas.getContext("2d");

const gargantuaCanvas =
document.getElementById("gargantua");

const gctx =
gargantuaCanvas.getContext("2d");

function resize(){

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

/* ---------- ЗІРКИ ---------- */

const stars = [];

function generateStars(){

    stars.length = 0;

    for(let i=0;i<900;i++){

        stars.push({

            x:
            Math.random() *
            starsCanvas.width,

            y:
            Math.random() *
            starsCanvas.height,

            r:
            Math.random()*2,

            a:
            0.2 +
            Math.random()*0.8

        });

    }

}

generateStars();

window.addEventListener(
    "resize",
    generateStars
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

function drawGargantua(){

    gctx.clearRect(
        0,
        0,
        gargantuaCanvas.width,
        gargantuaCanvas.height
    );

    const drift =
    performance.now()*0.0002;

    const cx =
    gargantuaCanvas.width/2 +
    Math.cos(drift)*60;

    const cy =
    gargantuaCanvas.height/2 +
    Math.sin(drift*0.7)*35;

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
        r*2.2
    );

    glow.addColorStop(
        0,
        "rgba(255,180,100,0)"
    );

    glow.addColorStop(
        0.5,
        "rgba(255,150,50,0.18)"
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
        r*2,
        0,
        Math.PI*2
    );

    gctx.fill();

    /* ДИСК */

    for(let i=0;i<18;i++){

        gctx.beginPath();

        gctx.strokeStyle =
        `rgba(
            255,
            220,
            140,
            ${0.04+i*0.012}
        )`;

        gctx.lineWidth =
        2+i*0.8;

        gctx.ellipse(
            cx,
            cy,
            r*2.2+i*2,
            r*0.15+i*0.08,
            0,
            0,
            Math.PI*2
        );

        gctx.stroke();

    }

    const horizon =
    gctx.createRadialGradient(
        cx,
        cy,
        r*0.2,
        cx,
        cy,
        r*1.15
    );

    horizon.addColorStop(
        0,
        "#000"
    );

    horizon.addColorStop(
        0.75,
        "#000"
    );

    horizon.addColorStop(
        1,
        "rgba(255,180,80,0.08)"
    );

    gctx.beginPath();

    gctx.arc(
        cx,
        cy,
        r*1.12,
        0,
        Math.PI*2
    );

    gctx.fillStyle =
    horizon;

    gctx.fill();

/* КІНЕЦЬ ЧАСТИНИ 1 */
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
            ${0.09 - i * 0.01}
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
        1 + i*0.35;

        gctx.ellipse(
            cx,
            cy + r*0.22,
            r*2.15 + i*1.2,
            r*0.08 + i*0.025,
            0,
            Math.PI*0.08,
            Math.PI*0.92
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

    if(!element) return;

    element.style.left =
    (x - element.offsetWidth/2)
    + "px";

    element.style.top =
    (y - element.offsetHeight/2)
    + "px";
}

function animatePlanets(){

    const t =
    performance.now()/1000;

    /* той самий дрейф що й у Гаргантюа */

    const bx =
    window.innerWidth/2 +
    Math.cos(t*0.2)*60;

    const by =
    window.innerHeight/2 +
    Math.sin(t*0.14)*35;

    setPlanet(
        nuclear,
        bx + Math.cos(t*0.8) * 280,
        by + Math.sin(t*0.8) * 140
    );

    setPlanet(
        semiconductor,
        bx + Math.cos(t*1.0 + 1.5) * 180,
        by + Math.sin(t*1.0 + 1.5) * 90
    );

    setPlanet(
        mechanics,
        bx + Math.cos(t*0.65 + 3.1) * 360,
        by + Math.sin(t*0.65 + 3.1) * 180
    );

    setPlanet(
        radio,
        bx + Math.cos(t*0.55 + 4.8) * 500,
        by + Math.sin(t*0.55 + 4.8) * 240
    );

    requestAnimationFrame(
        animatePlanets
    );
}

animatePlanets();
