"use strict";

function playSong(){
const playlist = new Array('/prace4/musicForWebGame/doomBFG.mp3', '/prace4/musicForWebGame/hyper.mp3', '/prace4/musicForWebGame/Quixotic.mp3', '/prace4/musicForWebGame/singularity.mp3');
const form = document.forms.demo;
const radios = form.elements.music;
const value = radios.value;
const audioPlayer = document.getElementById("audioPlayer");
switch(value){
    case "1":
        console.log('hey');
        audioPlayer.src=playlist[0];
        audioPlayer.volume = 0.6;
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

let exit;
let note;
let controlledObject = {
    score: [],

    eatNote(note){
        this.score.push(note);
    }
};

let player = {
    __proto__: controlledObject,
    score:[]
};
function createGame(){
    playSong();
    document.getElementById("container").style.bottom ="5000px";
    exit = new component("80px","Consolas","red",850,100,"text");
    player = new component(70, 70, "red", 390,320); // 0 980 430 0
    myGameZone.start();
    updateGameZone();

}
var myGameZone = {
    canvas: document.createElement('canvas'),
    start: function(){
        this.canvas.width = 1048;
        this.canvas.height =900;
        this.canvas.style.border = "2px solid black";
        this.canvas.style.backgroundColor = "#090a0a";
        this.context = this.canvas.getContext("2d");
        document.getElementById("contentContainer").appendChild(this.canvas);
        this.canvas.id = "canvas";
        this.canvas.style.position = "relative";
        this.canvas.style.zIndex = 1;
        this.interval = setInterval(updateGameZone, 20);
        window.addEventListener('mousedown', function (exit) {
            myGameZone.x = exit.pageX;
            myGameZone.y = exit.pageY;
          })
          window.addEventListener('mouseup', function (exit) {
            myGameZone.x = false;
            myGameZone.y = false;
          })
          window.addEventListener('touchstart', function (exit) {
            myGameZone.x = exit.pageX;
            myGameZone.y = exit.pageY;
        })
        window.addEventListener('touchend', function (exit) {
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
        if(this.x < 30  ){
            this.speedX = -this.speedX;
            this.speedY = this.speedY
        }
        if(this.x > 950){
            this.speedX = -this.speedX;
            this.speedY = this.speedY;
        }
        if(this.x >=770 && this.y <= 120){
            this.speedX = -this.speedX;
            this.speedY = this.speedY;
        }
        if(this.y <=130 && this.x >= 770){
            this.speedY = -this.speedY;
            this.speedX = this.speedX;
        }
        
        if(this.y < 30 ){
            this.speedY = -this.speedY;
            this.speedX = this.speedX;
        }
        if(this.y > 800){
            this.speedY = -this.speedY;
            this.speedX = this.speedX;;
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
        if(myText < myGameZone.y || (mytop > myGameZone.y) || (myright < myGameZone.x) ||(myleft > myGameZone.x)){
            clicked = false;
        }
        return clicked;
    }
    }
    
function updateGameZone() {
    myGameZone.clear();
    exit.text  = "EXIT";
    exit.update();
    if(myGameZone.x && myGameZone.y){
        if(exit.clicked()){
            this.canvas.remove();
            audioPlayer.src ="";
            document.getElementById("container").style.bottom ="0px";   
                     
        }
    }
    player.newPosition();
    player.update();
    
}

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if(e.keyCode == '38' || e.keyCode == '40' || e.keyCode == '37' || e.keyCode == '39'){
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
    if (e.keyCode == '38') {
        player.speedY -= 1;
    }
    else if (e.keyCode == '40') {
        player.speedY += 1; 
    }
    else if (e.keyCode == '37') {
        player.speedX -= 1; 
    }
    else if (e.keyCode == '39') {
        player.speedX += 1; 
    }
    else if (e.keyCode == '32'){
        player.speedX =0;
        player.speedY =0;
    }
}



