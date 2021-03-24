// global constants
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var cluePauseTime = 333; //how long to pause in between clues
var pattern = [];
var mistakes = 0;
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var time;

function startGame(){
    //initialize game variables
    clueHoldTime = 1000;
    cluePauseTime = 333;
    generatePattern();
    mistakes = 0;
    progress = 0;
    gamePlaying = true;
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    playClueSequence();
}

function stopGame(){
    gamePlaying = false;
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("stopBtn").classList.add("hidden");
    clearInterval(time);
    document.getElementById("countdown").innerHTML = "";
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 533.9,
  6: 658.7
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
  clueHoldTime -= 100;
  cluePauseTime -= 60;
  var counter = 10;
  timer();
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
  document.getElementById("countdown").innerHTML = "";
}
function winGame(){
  stopGame();
  alert("Game Over. You won!");
  document.getElementById("countdown").innerHTML = "";
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  if (pattern[guessCounter] == btn) {
    if (guessCounter == progress) {
      if (progress == pattern.length-1) {
        winGame();
      } else {
        clearInterval(time);
        progress++;
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  } else {
    mistakes++;
    if (mistakes > 2) {
      loseGame();
      return;
    } else if (mistakes == 2) {
      alert("Try again. You have 1 attempt left.");
    } else if (mistakes == 1) {
      alert("Try again. You have 2 attempts left.");
    }
  }
}

function generatePattern() {
  for (let i=0; i < 8; i++) {
    pattern[i] = Math.floor((Math.random() * 6) + 1);
  }
}

function timer() {
  var counter = 10;
  var interval = setInterval(function() {
    counter--;
    time = interval;
    if (counter == 0) {
      loseGame();
      clearInterval(interval);
    }
    else {
      document.getElementById("countdown").innerHTML = counter + " seconds remaining";
    }
  }, 1000);
}