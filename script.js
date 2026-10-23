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

/* ======================
        ЗІРКИ
====================== */

const stars = [];

function createStars(){

    stars.length = 0;

    for(let i=0;i<1000;i++){

        stars.push({

            x:
            Math.random()*starsCanvas.width,

            y:
            Math.random()*starsCanvas.height,

            r:
            Math.random()*2,

            a:
            0.2 +
            Math.random()*0.8

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
        `rgba(
            255,
            255,
            255,
            ${star.a}
        )`;

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

/* ======================
      ГАРГАНТЮА
====================== */

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

    /* ГРАВІТАЦІЙНЕ ЛІНЗУВАННЯ */

    const glow =
    gctx.createRadialGradient(
        cx,
        cy,
        r * 0.9,
        cx,
        cy,
        r * 2.2
    );

    glow.addColorStop(
        0,
        "rgba(255,180,90,0)"
    );

    glow.addColorStop(
        0.4,
        "rgba(255,170,70,0.18)"
    );

    glow.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    gctx.fillStyle =
    glow;

    gctx.beginPath();

    gctx.arc(
        cx,
        cy,
        r * 2.2,
        0,
        Math.PI * 2
    );

    gctx.fill();

    /* ФРОНТАЛЬНА ЧАСТИНА ДИСКА */

    for(let i=0;i<8;i++){

        gctx.beginPath();

        gctx.strokeStyle =
        `rgba(
            255,
            235,
            180,
            ${0.06 + i*0.02}
        )`;

        gctx.lineWidth =
        1 + i*0.3;

        gctx.ellipse(
            cx,
            cy + r*0.08,
            r*2.15 + i,
            r*0.01 + i*0.004,
            0,
            Math.PI*0.12,
            Math.PI*0.88
        );

        gctx.stroke();

    }

    requestAnimationFrame(
        drawGargantua
    );
}

drawGargantua();

/* ======================
       ОБ'ЄКТИ
====================== */

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
    (x-element.offsetWidth/2)+"px";

    element.style.top =
    (y-element.offsetHeight/2)+"px";
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
        cx-320+
        Math.cos(t*2.4)*35,

        cy+140+
        Math.sin(t*2.4)*12
    );

    setPlanet(
        semiconductor,
        cx-140+
        Math.cos(t*2.2)*30,

        cy-100+
        Math.sin(t*2.2)*15
    );

    setPlanet(
        mechanics,
        cx+260+
        Math.cos(t*1.8)*25,

        cy+90+
        Math.sin(t*1.8)*12
    );

    setPlanet(
        radio,
        cx+430+
        Math.cos(t*1.6)*18,

        cy-90+
        Math.sin(t*1.6)*10
    );

    requestAnimationFrame(
        animatePlanets
    );
}

animatePlanets();
