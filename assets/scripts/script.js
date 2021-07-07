let canvas = document.getElementById('canvas1');
canvas.width = 650;
canvas.height = 650;

let ctx = canvas.getContext("2d");
let note1 = document.getElementById("note");

let playbutton = document.getElementById('play');
let stopbutton = document.getElementById('stop');
let workbutton = document.getElementById('work');
let shortBreakbutton = document.getElementById('shortbreak');
let longBreakbutton = document.getElementById('longbreak');

let isPlay = false;
let initStage = true;
let isWork = true;
let isShortBreak = false;
let isLongBreak = false;


ctx.fillStyle = '#ed4242';
ctx.strokeStyle = '#ed4242';
// ctx.strokeStyle = 'white';
ctx.lineWidth= 3;

var circum = 3 * Math.PI / 2;

let fps = 60;
var startTime = Date.now();

var loopStart = 0;
var timeStart = 1500 * 1000 + Date.now();


var timeleft = timeStart - Date.now();
var now = Date.now();

var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

var dPos = ((Math.PI * 2) / 15000);
var timeSince;
var initTimeStamp = 0;
var timeElapsed;
var isFinished = false;
var shortBreakCounter = 0;

function circle(){
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 315, circum, 3 * Math.PI / 2);
    ctx.stroke();
}


function mainLoop(timestamp){
    requestAnimationFrame(mainLoop);
    startTime = Date.now();
    timeleft = timeStart - Date.now();
    

    playbutton.onclick = () => {
        if (!isPlay && !initStage){
        timeElapsed = timestamp -  initTimeStamp;
        timeStart += timeElapsed;
        }

        isPlay = true
        
    };

    stopbutton.onclick = () => {
        initTimeStamp = timestamp;
        isPlay = false
    };

    workbutton.onclick = () => {
        if (!isWork){
            initStage = true
        }
        isWork = true
        isShortBreak = false
        isLongBreak = false
        isPlay = false
    };

    shortBreakbutton.onclick = () => {
        if (!isShortBreak){
            initStage = true
        }
        isShortBreak = true
        isLongBreak = false
        isWork = false
        isPlay = false
    };


    longBreakbutton.onclick = () => {
        if (!isLongBreak){
            initStage = true
        }
        isLongBreak = true
        isShortBreak = false
        isWork = false
        isPlay = false
    };



    if (isWork && initStage){
        initTimeStamp = timestamp;
        timeStart = 1500 * 1000 + Date.now();
        timeleft = timeStart - Date.now();
        minutes = minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        initStage = false;
        document.getElementById("maintime").style.color = "#ed4242";
        note1.innerHTML =  minutes + "m " + seconds + "s ";
        circle();
        circum = 3 * Math.PI / 2;
    }

    if (isShortBreak && initStage){
        initTimeStamp = timestamp;
        timeStart = 300 * 1000 + Date.now();
        timeleft = timeStart - Date.now();
        minutes = minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        initStage = false;
        document.getElementById("maintime").style.color = "#7FDBFF";
        note1.innerHTML =  minutes + "m " + seconds + "s ";
        circle();
        circum = 3 * Math.PI / 2;
    }

    if (isLongBreak && initStage){
        initTimeStamp = timestamp;
        timeStart = 900 * 1000 + Date.now();
        timeleft = timeStart - Date.now();
        minutes = minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        initStage = false;
        note1.innerHTML =  minutes + "m " + seconds + "s ";
        circum = 3 * Math.PI / 2;
    }
 
    //IsFinished
    if(timeleft <= 0){
        isFinished = true
    }

    if (isWork && isFinished){
        isWork = false;
        if(shortBreakCounter >= 4){
            isLongBreak = true;
            isShortBreak = false;
        }else{
            isShortBreak = true;
            isLongBreak = false;
        }
        initStage = true;
    }

    if ((isShortBreak && isFinished) || (isLongBreak && isFinished)){
        isWork = true;
        isShortBreak = false;
        isLongBreak = false;
    }





    if (isPlay && startTime >= loopStart){
        update();
        
        circle();
        minutes = minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        if (timeleft < 0){
            note1.innerHTML =  "Relax.."
        }
        loopStart = startTime + 100;
        note1.innerHTML =  minutes + "m " + seconds + "s ";

    
    }

    else if(isPlay){
        note1.innerHTML =  minutes + "m " + seconds + "s ";
    }

    console.log(timeElapsed);

    if (isWork){
        ctx.strokeStyle = '#ed4242';
        document.getElementById("maintime").style.backgroundColor = '#ed4242';
        document.getElementById("navbar").style.backgroundColor = '#ed4242';
        document.getElementById("timeleft").style.backgroundColor = '#ed4242';
        document.getElementById("play").style.backgroundColor = '#ed4242';
        document.getElementById("stop").style.backgroundColor = '#ed4242';
        document.getElementById("work").style.backgroundColor = '#ed4242';
        document.getElementById("shortbreak").style.backgroundColor = '#ed4242';
        document.getElementById("longbreak").style.backgroundColor = '#ed4242';
        dPos = ((Math.PI * 2) / 15000);
    }

    if (isShortBreak){
        ctx.strokeStyle = '#1FDE89';
        document.getElementById("maintime").style.backgroundColor = '#1FDE89';
        document.getElementById("navbar").style.backgroundColor = '#1FDE89';
        document.getElementById("timeleft").style.backgroundColor = '#1FDE89';
        document.getElementById("play").style.backgroundColor = '#1FDE89';
        document.getElementById("stop").style.backgroundColor = '#1FDE89';
        document.getElementById("work").style.backgroundColor = '#1FDE89';
        document.getElementById("shortbreak").style.backgroundColor = '#1FDE89';
        document.getElementById("longbreak").style.backgroundColor = '#1FDE89';
        dPos = ((Math.PI * 2) / 3000);
    }

    if (isLongBreak){
        ctx.strokeStyle = '#80ced6';
        document.getElementById("maintime").style.backgroundColor = '#80ced6';
        document.getElementById("navbar").style.backgroundColor = '#80ced6';
        document.getElementById("timeleft").style.backgroundColor = '#80ced6';
        document.getElementById("play").style.backgroundColor = '#80ced6';
        document.getElementById("stop").style.backgroundColor = '#80ced6';
        document.getElementById("work").style.backgroundColor = '#80ced6';
        document.getElementById("shortbreak").style.backgroundColor = '#80ced6';
        document.getElementById("longbreak").style.backgroundColor = '#80ced6';
        dPos = ((Math.PI * 2) / 9000);
    }

}



function update(){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    circum += dPos;
}

mainLoop();

//Bugs, After timer has eneded, it skips towards -1 minute, or does not go to 0 