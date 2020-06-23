"use strict";

function playSong(){
const playlist = new Array('musicForWebGame/doomBFG.mp3', 'musicForWebGame/hyper.mp3', 'musicForWebGame/Quixotic.mp3', 'musicForWebGame/singularity.mp3');
const form = document.forms.demo;
const radios = form.elements.music;
const value = radios.value;
const audioPlayer = document.getElementById("audioPlayer");
switch(value){
    case "1":
        audioPlayer.src=playlist[0];
        audioPlayer.volume = 0;
        audioPlayer.play();
        break;
    case "2":
        audioPlayer.src=playlist[1];
        audioPlayer.volume = 0.6;
        audioPlayer.play();
        break;
    case "3":
        audioPlayer.src=playlist[2];
        audioPlayer.volume = 0.6;
        audioPlayer.play();
        break;
    case "4":
        audioPlayer.src=playlist[3];
        audioPlayer.volume = 0.6;
        audioPlayer.play(); 
        break;
    default:
        console.log("lox");
        break;
}
}

var exit;
var note = [];
var controlledObject = {
    score: [],

    // eatNotes(note){
    //     this.score.push(note);
    // }
};

var player = {
    __proto__: controlledObject,
    score:[]
};


function createGame(){
    playSong();
    document.getElementById("container").style.bottom ="5000px";
    exit = new component("60px","Consolas","red",460,80,"text");
    player = new component(70, 70, "red", 85,20); 
    myGameZone.start();
    updateGameZone();

}
var myGameZone = {
    canvas: document.createElement('canvas'),
    start: function(){
        this.canvas.width = 628;
        this.canvas.height =900;
        this.canvas.style.border = "2px solid black";
        this.canvas.style.backgroundColor = "#090a0a";
        this.canvas.id = "canvas";
        this.canvas.style.position = "relative";
        this.canvas.style.display = "flex";
        this.canvas.style.flexGrow = "1";
        this.context = this.canvas.getContext("2d");
        document.getElementById("contentContainer").appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameZone, 20);
        window.addEventListener('mousedown', function (e) {
            myGameZone.x = e.pageX;
            myGameZone.y = e.pageY;
          })
          window.addEventListener('mouseup', function (e) {
            myGameZone.x = false;
            myGameZone.y = false;
          })
        },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
};  

class component {
    constructor(width, height, color, x, y, type) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0; 
        this.x = x;
        this.y = y;
        this.color = color;
    }  
    update() {
            if (this.type == "text") {
                myGameZone.context.font = this.width + " " + this.height;
                myGameZone.context.fillStyle = this.color;
                myGameZone.context.fillText(this.text, this.x, this.y);
            }
            else {
                myGameZone.context.fillStyle = this.color;
                myGameZone.context.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    newPosition() { 
            
        if(this.x >= 375 && this.y <= 75){
            this.speedX = -this.speedX;
            this.speedY = this.speedY;
            }
        if(this.y <= 90 && this.x >= 400){
            this.speedY = -this.speedY;
            this.speedX = this.speedX;
            }
        if(this.y < 0){
            this.y = 0;
            this.speedY = -this.speedY;
        }
        if(this.x < 0){
            this.x = 0;
            this.speedX = -this.speedX;
        }
        var rockright = myGameZone.canvas.width - this.width;
        if(this.x > rockright){
            this.x = rockright;
            this.speedX = - this.speedX;
        }
        var rockbottom = myGameZone.canvas.height - this.height;
        if(this.y > rockbottom){
            console.log(rockbottom);
            this.y = rockbottom;
            this.speedY = - this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }
    clicked(){

        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var myText = this.y + (this.height);
        var clicked = true;
        if ((myText < myGameZone.y) || (mytop > myGameZone.y) || (myright < myGameZone.x) || (myleft > myGameZone.x)){
            clicked = false;
        }
        return clicked;
    }
   
    // eatNote(){
    //     var myLeft = this.x;
    //     var myRight = this.x + (this.width);
    //     var myTop = this.y;
    //     var myBottom = this.y + (this.height);
    //     var otherLeft = note.x;
    //     var otherRight = note.x + (note.width);
    //     var otherTop = note.y;
    //     var otherBottom = note.y + (note.height);
    //     var eated = true; 
    //     if ((myBottom < otherTop) || (myTop > otherBottom) || (myRight < otherLeft) || (myLeft > otherRight)) {
    //         eated = false;
    //     }
    //     return eated;

    // }
    }
    
function updateGameZone() { 
    var minX,  minY;
    // for (let i = 0; i < note.length; i++){
    //     if(player.eatNote(note[i])){
    //         note.clearRect();
    //         player.score++; 
    //     }
    // }
    myGameZone.clear();
    myGameZone.frameNo += 1;
    if(myGameZone.frameNo == 1 || everyinterval(200)){
        minX = Math.floor(Math.random() * (myGameZone.canvas.width - 50));
        minY = Math.floor(Math.random() * (myGameZone.canvas.height - 50));
        note.push(new component (40,54, "green",minX, minY));
    }
    for (let i = 0; i < note.length; i++){
        note[i].update();
    }
    exit.text  = "EXIT";
    exit.update();
    if(myGameZone.x && myGameZone.y){
        if(exit.clicked()){
            myGameZone.clear();
            note = [];
            this.canvas.remove();
            audioPlayer.src ="";
            document.getElementById("container").style.bottom ="0px";              
        }
    }
    player.newPosition();
    player.update();
    
}

document.onkeydown = checkKey;

function everyinterval(n) {
    if ((myGameZone.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function checkKey(e) {
    e = e || window.event;
    if(e.keyCode == '38' || e.keyCode == '40' || e.keyCode == '37' || e.keyCode == '39'){
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
    if (e.keyCode == '38') {
        player.speedY -= .5;
    }
    else if (e.keyCode == '40') {
        player.speedY += .5; 
    }
    else if (e.keyCode == '37') {
        player.speedX -= .5; 
    }
    else if (e.keyCode == '39') {
        player.speedX += .5; 
    }
    else if (e.keyCode == '32'){
        player.speedX = 0;
        player.speedY = 0;
    }
}





