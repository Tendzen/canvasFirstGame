"use strict";
let exit;
let scoreName;
let eatednote=0;
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
let mySound;
const audioPlayer = document.getElementById("audioPlayer");
const playlist = new Array('musicForWebGame/doomBFG.mp3', 'musicForWebGame/hyper.mp3', 'musicForWebGame/Quixotic.mp3', 'musicForWebGame/singularity.mp3');
audioPlayer.src = playlist[0];
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
function createGame(){
    audioPlayer.pause();
    document.getElementById("container").style.bottom ="5000px";
    exit = new component("60px","Consolas","red",innerWidth-160,80,"text");
    scoreName = new component("50px","Consolas","red",10,80,"text");
    player = new component(70, 70, "red", 205,220,"object");
    mySound = new sound(audioPlayer.src);
    myGameZone.start();
    mySound.play();
    updateGameZone();
    setInterval(upVolume,1000);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.volume = 0.1;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    let volumeNow = 0.05;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
    this.startUp = function(){
        volumeNow = 0.05;
        this.sound.volume += volumeNow;

    }
    this.stopUp = function(){
        volumeNow = 0.0;
        if(this.sound.volume > 0.6){
            this.sound.volume = 0.5;
        }

    }
    this.startLower = function(){
        this.sound.volume -=0.1;
    }
    this.stopLower = function(){
        this.sound.volume == this.sound.volume;
    }

}

let myGameZone = {
    canvas: document.createElement('canvas'),
    start: function(){
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
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


let isStandingOnNote = false;

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
    this.clicked = function(){ // переделать под exit  responsive
        let left = 661;
        let right = 759;
        let top = 114;
        let bottom = 146;
        let clicked = true;
        if ((bottom < myGameZone.y) || (top > myGameZone.y) || (right < myGameZone.x) || (left > myGameZone.x)){
            clicked = false;
        }
        return clicked;
        
    }

    this.isOnNote = function(otherObj){        
        let myLeft = this.x;
        let myRight = this.x + (this.width);
        let myTop = this.y;
        let myBottom = this.y + (this.height);
        let otherLeft = otherObj.x;
        let otherRight = otherObj.x + (otherObj.width);
        let otherTop = otherObj.y;
        let otherBottom = otherObj.y + (otherObj.height);
        isStandingOnNote = true;
        if ((myBottom < otherTop) || (myTop > otherBottom) || (myRight < otherLeft) || (myLeft > otherRight)) {
            isStandingOnNote = false;
        }
        return isStandingOnNote;
        
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

function updateGameZone() {
    if(myGameZone.x && myGameZone.y){
        if(exit.clicked()){
            myGameZone.clear();
            note = [];
            myGameZone.stop(); 
            myGameZone.canvas.remove();
            mySound.sound.src = "";
            document.getElementById("container").style.bottom ="0px";                 
        }
    } 
    for (let i = 0; i < note.length; i++){
        if(player.isOnNote(note[i])){
            note[i].deleteComponent();
            eatednote++;
            note.splice(i,1);
            console.log(note);
        }
    }
    myGameZone.clear();
    myGameZone.frameNo += 1;
    if(myGameZone.frameNo == 2 || everyinterval(150)){
        let minY,minX;
        minX = Math.floor(Math.random() * (myGameZone.canvas.width - 50));
        minY = Math.floor(Math.random() * (myGameZone.canvas.height - 80));
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
function upVolume(){
    console.log(isStandingOnNote);
    if(isStandingOnNote){
        console.log(isStandingOnNote);
    }
}

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if(e.keyCode == '38' || e.keyCode == '40' || e.keyCode == '37' || e.keyCode == '39' || e.keyCode == '32'){
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

function getPosition(e) {
    var posx = 0;
    var posy = 0;
  
    if (!e) var e = window.event;
  
      posx = e.pageX;
      posy = e.pageY;
    
  
    return {
      x: posx,
      y: posy
    }
  }
  document.addEventListener( "click", function(e) {
    var x = getPosition(e).x;
    var y = getPosition(e).y;
    console.log("x pos: "+ x +" // y pos:"+ y);
  });








