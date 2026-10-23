const starsCanvas = document.getElementById("space");
const starsCtx = starsCanvas.getContext("2d");

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

window.addEventListener("resize",resize);

const stars=[];

function generateStars(){

stars.length=0;

for(let i=0;i<1000;i++){

stars.push({

x:Math.random()*window.innerWidth,
y:Math.random()*window.innerHeight,

r:Math.random()*2,

a:Math.random()

});

}

}

generateStars();

function drawStars(){

starsCtx.clearRect(
0,0,
starsCanvas.width,
starsCanvas.height
);

for(const s of stars){

starsCtx.beginPath();

starsCtx.fillStyle=
`rgba(255,255,255,${s.a})`;

starsCtx.arc(
s.x,s.y,s.r,
0,Math.PI*2
);

starsCtx.fill();

}

requestAnimationFrame(drawStars);

}

drawStars();

let t=0;

function drawGargantua(){

gctx.clearRect(
0,0,
gargantuaCanvas.width,
gargantuaCanvas.height
);

const cx=
window.innerWidth/2;

const cy=
window.innerHeight/2;

const r=
Math.min(
window.innerWidth,
window.innerHeight
)*0.13;

t+=0.01;

const lens=
gctx.createRadialGradient(
cx,
cy,
r*1.05,
cx,
cy,
r*1.55
);

lens.addColorStop(
0,
"rgba(255,255,255,0)"
);

lens.addColorStop(
0.35,
"rgba(255,220,140,0.18)"
);

lens.addColorStop(
1,
"rgba(0,0,0,0)"
);

gctx.fillStyle=lens;

gctx.beginPath();

gctx.arc(
cx,
cy,
r*1.65,
0,
Math.PI*2
);

gctx.fill();

for(let i=0;i<22;i++){

gctx.strokeStyle=
`rgba(
255,
${190+i*2},
80,
${0.03+i*0.01}
)`;

gctx.lineWidth=
2+i*0.8;

gctx.beginPath();

gctx.ellipse(
cx,
cy,
r*2.6+(i*4),
(r*0.32)+(i*0.4),
0,
0,
Math.PI*2
);

gctx.stroke();

}

for(let i=0;i<20;i++){

gctx.strokeStyle=
`rgba(
255,
255,
220,
${0.02+i*0.01}
)`;

gctx.lineWidth=
1+i*0.4;

gctx.beginPath();

gctx.ellipse(
cx,
cy-r*0.95,
r*0.9+(i*1.8),
r*0.12+(i*0.15),
0,
0,
Math.PI*2
);

gctx.stroke();

}

gctx.beginPath();

gctx.arc(
cx,
cy,
r,
0,
Math.PI*2
);

gctx.fillStyle="black";

gctx.fill();

gctx.beginPath();

gctx.arc(
cx,
cy,
r*1.03,
0,
Math.PI*2
);

gctx.strokeStyle=
"rgba(255,200,120,0.35)";

gctx.lineWidth=4;

gctx.stroke();

requestAnimationFrame(
drawGargantua
);

}

drawGargantua();

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

function setPos(el,x,y){

el.style.left=
(x-el.offsetWidth/2)+"px";

el.style.top=
(y-el.offsetHeight/2)+"px";

}

function animateObjects(){

const cx=
window.innerWidth/2;

const cy=
window.innerHeight/2;

const tt=
performance.now()/1000;

setPos(
nuclear,
cx-290+Math.cos(tt)*15,
cy+150
);

setPos(
semiconductor,
cx-110+Math.cos(tt*0.7)*25,
cy-120
);

setPos(
mechanics,
cx+250+Math.sin(tt*0.4)*20,
cy+80
);

setPos(
radio,
cx+420+Math.cos(tt*0.25)*15,
cy-90
);

setPos(
video,
cx+
Math.cos(tt*4)*180,

cy+
Math.sin(tt*4)*60
);

requestAnimationFrame(
animateObjects
);

}

animateObjects();
