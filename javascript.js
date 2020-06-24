"use strict";

const audioPlayer = document.getElementById("audioPlayer");
const playlist = new Array('musicForWebGame/doomBFG.mp3', 'musicForWebGame/hyper.mp3', 'musicForWebGame/Quixotic.mp3', 'musicForWebGame/singularity.mp3');

function playSong(){
const form = document.forms.demo;
const radios = form.elements.music;
const value = radios.value;
switch(value){
    case "1":
        audioPlayer.src=playlist[0];
        audioPlayer.volume = 0.3;
        audioPlayer.play();
        break;
    case "2":
        audioPlayer.src=playlist[1];
        audioPlayer.volume = 0.3;
        audioPlayer.play();
        break;
    case "3":
        audioPlayer.src=playlist[2];
        audioPlayer.volume = 0.3;
        audioPlayer.play();
        break;
    case "4":
        audioPlayer.src=playlist[3];
        audioPlayer.volume = 0.3;
        audioPlayer.play(); 
        break;
    default:
        break;
}
}

let exit;
let scoreName;
let note = [];
let controlledObject = {
    score: [],
    eatNotes(note){
        this.score = [note];
    }
};

let player = {
    __proto__: controlledObject,
    score:[]
};
var myMusic;
var mySound;


function createGame(){
    audioPlayer.pause();
    document.getElementById("container").style.bottom ="5000px";
    exit = new component("60px","Consolas","red",460,80,"text");
    scoreName = new component("50px","Consolas","red",10,80,"text");
    player = new component(70, 70, "red", 205,220,"object");
    mySound = new sound(audioPlayer.src);
    myGameZone.start();
    mySound.play();
    updateGameZone();

}

let myGameZone = {
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

// class component {
//     constructor(width, height, color, x, y, type) {
//         this.type = type;
//         this.width = width;
//         this.height = height;
//         this.speedX = 0;
//         this.speedY = 0; 
//         this.x = x;
//         this.y = y;
//         this.color = color;
//     }  
//     update() {
//             if (this.type == "text") {
//                 myGameZone.context.font = this.width + " " + this.height;
//                 myGameZone.context.fillStyle = this.color;
//                 myGameZone.context.fillText(this.text, this.x, this.y);
//             }
//             else {
//                 myGameZone.context.fillStyle = this.color;
//                 myGameZone.context.fillRect(this.x, this.y, this.width, this.height);
//             }
//         }
//     newPosition() { 
            
//         if(this.x >= 375 && this.y <= 75){
//             this.speedX = -this.speedX;
//             this.speedY = this.speedY;
//             }
//         if(this.y <= 90 && this.x >= 400){
//             this.speedY = -this.speedY;
//             this.speedX = this.speedX;
//             }
//         if(this.y < 0){
//             this.y = 0;
//             this.speedY = -this.speedY;
//         }
//         if(this.x < 0){
//             this.x = 0;
//             this.speedX = -this.speedX;
//         }
//         var rockright = myGameZone.canvas.width - this.width;
//         if(this.x > rockright){
//             this.x = rockright;
//             this.speedX = - this.speedX;
//         }
//         var rockbottom = myGameZone.canvas.height - this.height;
//         if(this.y > rockbottom){
//             console.log(rockbottom);
//             this.y = rockbottom;
//             this.speedY = - this.speedY;
//         }
//         this.x += this.speedX;
//         this.y += this.speedY;
//     }
//     clicked(){

//         var myleft = this.x;
//         var myright = this.x + (this.width);
//         var mytop = this.y;
//         var myText = this.y + (this.height);
//         var clicked = true;
//         if ((myText < myGameZone.y) || (mytop > myGameZone.y) || (myright < myGameZone.x) || (myleft > myGameZone.x)){
//             clicked = false;
//         }
//         return clicked;
//     }
   
//     eatNote(){
//         var myLeft = this.x;
//         var myRight = this.x + (this.width);
//         var myTop = this.y;
//         var myBottom = this.y + (this.height);
//         var otherLeft = note.x;
//         var otherRight = note.x + (note.width);
//         var otherTop = note.y;
//         var otherBottom = note.y + (note.height);
//         var eated = true; 
//         if ((myBottom < otherTop) || (myTop > otherBottom) || (myRight < otherLeft) || (myLeft > otherRight)) {
//             eated = false;
//         }
//         return eated;

//     }
//     }

function component (width, height, color, x, y, type){
        this.type = type;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0; 
        this.x = x;
        this.y = y;
        this.color = color;
    
    this.update = function() {
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
    this.newPosition = function() { 

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
            this.y = rockbottom;
            this.speedY = - this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.clicked = function(){
        var left = 870;
        var right = 1000;
        var top = 130;
        var bottom = 160;
        var clicked = true;
        if ((bottom < myGameZone.y) || (top > myGameZone.y) || (right < myGameZone.x) || (left > myGameZone.x)){
            clicked = false;
        }
        return clicked;
    }
   
    this.eatNote = function(otherObj){
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBottom = this.y + (this.height);
        var otherLeft = otherObj.x;
        var otherRight = otherObj.x + (otherObj.width);
        var otherTop = otherObj.y;
        var otherBottom = otherObj.y + (otherObj.height);
        var eated = true; 
        if ((myBottom < otherTop) || (myTop > otherBottom) || (myRight < otherLeft) || (myLeft > otherRight)) {
            eated = false;
        }
        return eated;
    }
    this.deleteComponent = function(width, height, color, x, y, type){
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.type = type;
        myGameZone.context.clearRect(this.x,this.y,this.width,this.height,this.type);
    }
    }
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.volume = "0.4";
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        setTimeout(this.sound.play(),120);
        }
    this.stop = function(){
        this.sound.pause();
    }
    this.upVolume = function(){
        this.sound.volume +=0.05;
    }    
}
function updateGameZone() { 
    let eatednote=0;
    if(myGameZone.x && myGameZone.y){
        if(exit.clicked()){
            myGameZone.clear();
            note = [];
            myGameZone.stop(); 
            myGameZone.canvas.remove();
            audioPlayer.src ="";
            document.getElementById("container").style.bottom ="0px";                 
        }
    }
    for (let i = 0; i < note.length; i++){
        if(player.eatNote(note[i])){
            note[i].deleteComponent();
            eatednote++;
        }
    }
    myGameZone.clear();
    myGameZone.frameNo += 1;
    if(myGameZone.frameNo == 2 || everyinterval(150)){
        let minY,minX;
        minX = Math.floor(Math.random() * (myGameZone.canvas.width - 50));
        minY = Math.floor(Math.random() * (myGameZone.canvas.height - 50));
        note.push(new component (30,30, "green",minX, minY,"object"));
    }
    for (let i = 0; i < note.length; i++){
        note[i].update();
    }
    exit.text  = "EXIT";
    exit.update();
    scoreName.text = "SCORE: " + eatednote;
    scoreName.update();
    player.newPosition();
    player.update();
}


function everyinterval(n) {
    if ((myGameZone.frameNo / n) % 1 == 0) {return true;}
    return false;
}

document.onkeydown = checkKey;
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

let timerId = setTimeout(function lowerVolume(){
    audioPlayer.volume /= 2;
    timerId = setTimeout(lowerVolume,6000);
},2000);




