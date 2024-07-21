var runSound = new Audio("run.mp3");
var jumpSound = new Audio("jump.mp3");
var deadSound = new Audio("dead.mp3");
var backgroundSound = new Audio("background.mp3");



function keyCheck(event) {
    var keycode = event.which;
    //alert(keycode);  

    if (keycode == 13) {//Enter
        if (runWorker == 0) {
            runWorker = setInterval(run, 100);
            runSound.play();
            
            backgroundWorker = setInterval(background, 100);
            scoreWorker = setInterval(updatescore, 100);
            boxworker = setInterval(moveboxes, 100);
            background.play();

        }
    }

    if (keycode == 32) {//space
        if (jumpWorker == 0) {
            clearInterval(runWorker);
            runSound.pause();
            jumpSound.play();
            jumpWorker = setInterval(jump, 100);
            runSound.play();

        }
    }

}

//boy run
var runImageNumber = 0;
var runWorker = 0;

function run() {
    runImageNumber = runImageNumber + 1;

    if (runImageNumber == 11) {
        runImageNumber = 1;
    }
    document.getElementById("boy").src = "Run (" + runImageNumber + ").png";
}

//background
var backgroundPositionX = 0;
var backgroundWorker = 0;

function background() {
    backgroundPositionX = backgroundPositionX - 12;
    backgroundSound.play();
    document.getElementById("background").style.backgroundPositionX = backgroundPositionX + "px";
}

//jump
var jumpImageNumber = 1;
var jumpWorker = 0;
var boyMarginTop = 370;

function jump() {

    if (jumpImageNumber <= 5) {
        boyMarginTop = boyMarginTop - 36;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }
    if (jumpImageNumber >= 6) {
        boyMarginTop = boyMarginTop + 36;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber == 11) {
        jumpImageNumber = 1;
        clearInterval(jumpWorker);
        runWorker = setInterval(run, 100);
        runSound.play();
        jumpWorker = 0;

        if (backgroundWorker == 0) {
            backgroundWorker = setInterval(background, 100);
        }
        if (scoreWorker == 0) {
            scoreWorker = setInterval(updatescore, 100);
        }

        if (boxworker == 0) {
            boxworker = setInterval(moveboxes, 100);
        }

    }
    document.getElementById("boy").src = "Jump (" + jumpImageNumber + ").png";
}

//score
var score = 0;
var scoreWorker = 0;
var gameoverSound = new Audio("gameover.mp3");

function updatescore() {
    score = score + 1;
    document.getElementById("score").innerHTML = score;

    if (score == 460){
        document.getElementById("endscore").innerHTML = score;
        runSound.pause();
        runWorker = -1;

        clearInterval(jumpWorker);
        jumpSound.pause();
        jumpWorker = -1;

        clearInterval(scoreWorker);
        scoreWorker = -1;

        clearInterval(backgroundWorker);
        backgroundWorker = -1;
        backgroundSound.pause();
        
        clearInterval(boxworker);
        boxworker = -1;

        gameoverSound.play();
        document.getElementById("win").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = score;
    }
}

//create Boxes
var bml = 400;

function createboxes() {
    for (var i = 0; i < 30; i++) {


        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;

        if (i <= 10) {
            bml = bml + 600;
        }

        if (i >= 11) {
            bml = bml + 500;
        }

        if (i >= 21) {
            bml = bml + 400;
        }



        box.style.marginLeft = bml + "px";

        document.getElementById("background").appendChild(box);
        
    }

}



//move Boxes
var boxworker = 0;

function moveboxes() {
    for (var i = 0; i < 20; i++) {
        var newbox = document.getElementById("box" + i);
        var boxml = getComputedStyle(newbox).marginLeft;
        var newboxml = parseInt(boxml) - 25;
        newbox.style.marginLeft = newboxml + "px";

        //alert(newboxml);
        //80 - 140

        if (newboxml >= 80 & newboxml <= 140) {

            if (boyMarginTop > 285) {
                clearInterval(runWorker);
                runWorker = -1;
                runSound.pause();

                clearInterval(jumpWorker);
                jumpWorker = -1;
                runSound.pause();

                clearInterval(backgroundWorker);
                backgroundWorker = -1;

                clearInterval(boxworker);
                boxworker = -1;

                clearInterval(scoreWorker);
                scoreWorker = -1;

                deadWorker = setInterval(dead, 100);
                deadSound.play();
                backgroundSound.pause();
                

            }
        }
    }
}

//dead

var deadImageNumber = 1;
var deadWorker = 0;

function dead() {
    deadImageNumber = deadImageNumber + 1;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        document.getElementById("boy").style.marginTop = "370px";
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = score;
    }

    document.getElementById("boy").src = "Dead (" + deadImageNumber + ").png"

}

function reload(){
    window.location.reload();
}

 