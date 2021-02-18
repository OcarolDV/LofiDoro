let canvas = document.getElementById('canvas1');
canvas.width = 800;
canvas.height = 800;


let ctx = canvas.getContext("2d");
ctx.fillStyle = '#ed4242';
ctx.strokeStyle = '#ed4242';
ctx.lineWidth= 3;

var circum = 3 * Math.PI / 2;
var dPos = (Math.PI * 4) / 600;

let fps = 60;
var startTime = Date.now();
let frameDuration = 1000/fps;
var loopStart = 0;

draw = function() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height, 375, circum, 3 * Math.PI / 2);
    ctx.stroke();

    circum += dPos;

    
}
function circle(circum){
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 375, circum, 3 * Math.PI / 2);
    ctx.stroke();
}

function mainLoop(){
    requestAnimationFrame(mainLoop);
    startTime = Date.now();
    if (startTime >= loopStart){
        update();
        circle(circum);
        loopStart = startTime + frameDuration;

    }
}

function update(){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    circum += dPos;
}

mainLoop();