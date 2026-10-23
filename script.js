const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize",resize);

const stars=[];

for(let i=0;i<500;i++){

stars.push({

x:Math.random()*window.innerWidth,
y:Math.random()*window.innerHeight,

r:Math.random()*2,

a:0.2 + Math.random()*0.8
});

}

function drawStars(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(const s of stars){

ctx.beginPath();

ctx.fillStyle=`rgba(255,255,255,${s.a})`;

ctx.arc(s.x,s.y,s.r,0,Math.PI*2);

ctx.fill();

}

requestAnimationFrame(drawStars);
}

drawStars();

const planets=[

{
el:document.querySelector(".nuclear"),
radius:280,
speed:0.004,
angle:0
},

{
el:document.querySelector(".semiconductor"),
radius:370,
speed:0.0025,
angle:1.5
},

{
el:document.querySelector(".mechanics"),
radius:480,
speed:0.0018,
angle:3
},

{
el:document.querySelector(".radio"),
radius:580,
speed:0.0012,
angle:4
},

{
el:document.querySelector(".video"),
radius:220,
speed:0.008,
angle:2.2
}

];

function animate(){

const cx=window.innerWidth/2;
const cy=window.innerHeight/2;

planets.forEach(p=>{

p.angle+=p.speed;

const x=
cx+
Math.cos(p.angle)*p.radius;

const y=
cy+
Math.sin(p.angle)*(p.radius*0.42);

p.el.style.left=x+"px";
p.el.style.top=y+"px";

});

requestAnimationFrame(animate);
}

animate();
