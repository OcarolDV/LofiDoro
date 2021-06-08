let canvas = document.getElementById('canvas1');
canvas.width = 650;
canvas.height = 650;


let ctx = canvas.getContext("2d");

let note1 = document.getElementById("note");

ctx.fillStyle = '#ed4242';
// ctx.strokeStyle = '#ed4242';
ctx.strokeStyle = 'white';
ctx.lineWidth= 3;

var circum = 3 * Math.PI / 2;

let fps = 60;
var startTime = Date.now();
let frameDuration = 1000/fps;

var loopStart = 0;
var timeStart = 1200 * 1000;
var dPos = ((Math.PI * 2) / (timeStart * 3/4) * frameDuration);
var minutes;
var seconds;

// function draw() {
//     requestAnimationFrame();
//     ctx.clearRect(0, 0, innerWidth, innerHeight);
//     time1.innerHTML = timestamp;
//     console.log(time1);
//     // ctx.beginPath();
//     // ctx.arc(canvas.width / 2, canvas.height, 375, circum, 3 * Math.PI / 2);
//     // ctx.stroke();
    


    
// }
function circle(){
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 315, circum, 3 * Math.PI / 2);
    ctx.stroke();
}

function mainLoop(timestamp){
    requestAnimationFrame(mainLoop);
    startTime = timestamp;
    if (startTime >= loopStart){
        update();
        
        circle();
        minutes = Math.floor(((timeStart - Math.round(timestamp)) % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor(((timeStart - Math.round(timestamp)) % (1000 * 60)) / 1000);
        note1.innerHTML =  minutes + "m " + seconds + "s ";
        if (timestamp > timeStart){
            note1.innerHTML =  "Relax.."
        }
        loopStart = timestamp + frameDuration;

    }

}

function update(){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    circum += dPos;
}

mainLoop();