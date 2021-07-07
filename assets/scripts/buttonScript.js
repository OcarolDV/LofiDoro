var button = document.getElementById('playbutton');

var isTrue = 1;

function change(){
    if (isTrue > 0){
        button.innerHTML = "Stop";
        isTrue *= -1;
    }
    else{
        button.innerHTML = "Start";
        isTrue *= -1;
    }

}

function hover(){
    button.style.background = '#ed4242';
    button.style.color= '#e1ebea';
}

function notHover(){
    button.style.background = 'none';
    button.style.color= '#ed4242';
}
