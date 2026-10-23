const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const stars = [];

for(let i=0;i<700;i++){

    stars.push({
        x:Math.random()*window.innerWidth,
        y:Math.random()*window.innerHeight,
        r:Math.random()*2.2,
        a:0.2+Math.random()*0.8
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

const planets = [

{
    el:document.querySelector(".nuclear"),
    radiusX:320,
    radiusY:140,
    speed:0.0024,
    angle:4.4
},

{
    el:document.querySelector(".semiconductor"),
    radiusX:240,
    radiusY:110,
    speed:0.0015,
    angle:3.6
},

{
    el:document.querySelector(".mechanics"),
    radiusX:500,
    radiusY:240,
    speed:0.0012,
    angle:5.4
},

{
    el:document.querySelector(".radio"),
    radiusX:620,
    radiusY:270,
    speed:0.0009,
    angle:5.9
},

{
    el:document.querySelector(".video"),
    radiusX:180,
    radiusY:75,
    speed:0.006,
    angle:0.2
}

];

function animate(){

    const cx = window.innerWidth/2;
    const cy = window.innerHeight/2;

    planets.forEach(p=>{

        p.angle += p.speed;

        const x =
            cx +
            Math.cos(p.angle)*p.radiusX;

        const y =
            cy +
            Math.sin(p.angle)*p.radiusY;

        p.el.style.left =
            (x - p.el.offsetWidth/2) + "px";

        p.el.style.top =
            (y - p.el.offsetHeight/2) + "px";

    });

    requestAnimationFrame(animate);

}

animate();
