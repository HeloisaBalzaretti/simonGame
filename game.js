var gameSequencePlayed = [];
var userSequencePlayed = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var catSongs = ["cat1", "cat2", "cat3", "cat4"];
var isGameOn = false;
var isSimonTurn = true;
const MOVES_TIMEOUT = 1000;
//general functions 

function getRandomNumber() {
  //gets a random number between 0-3, for the next color 
  return (Math.round(Math.random() * 3));
}

function getNextColor() {
  //takes the randon number and uses it to choose the next color played from buttonColors[]
  return buttonColors[getRandomNumber()];
}

function playSound(buttonColor){
  //receives a color and plays the sound. eg playSound(getNextColor())
  if (buttonColor != 'wrongCat'){
    buttonColor = catSongs[buttonColors.indexOf(buttonColor)];
  }
  var colorSound = new Audio(`sounds/${buttonColor}.mp3`);
  colorSound.play();
}

function playWrongSound(){
  //plays the error sound.
  playSound('wrongCat');
}
function blinkButton(btnColor){
  $(`#${btnColor}`).fadeOut(100).fadeIn(100);
}

function updateLevelTitle(level){
  $("#level-title").text("Level " + level);
}

function showCurrentMoves(index){
  if (index >= 0 && index < gameSequencePlayed.length){
    setTimeout(function (){
      var color = gameSequencePlayed[index];
      blinkButton(color);
      playSound(color);
      showCurrentMoves(index + 1);
    }, MOVES_TIMEOUT);
  } else {
    simonPlays();
  }
}

function simonTurn(){
  isSimonTurn = true;
  updateLevelTitle(gameSequencePlayed.length + 1);
  showCurrentMoves(0);  
}

function simonPlays(){
  setTimeout(function (){
    userSequencePlayed = [];
    var color = getNextColor();
    gameSequencePlayed.push(color);    
    blinkButton(color);
    playSound(color);
    isSimonTurn = false;
  }, MOVES_TIMEOUT);
}

function userPlays(colorClicked){ 
  userSequencePlayed.push(colorClicked);
  var currentIndex = userSequencePlayed.length - 1;

  if (userSequencePlayed[currentIndex] === gameSequencePlayed[currentIndex]){
    blinkButton(colorClicked);
    playSound(colorClicked);
    if(userSequencePlayed.length === gameSequencePlayed.length){
      simonTurn();
    }    
  } else{
    $("#level-title").html('You lost! click <a class="underline">here</a> to play again!');
    $(".underline").click(startGame);
    blinkButton(colorClicked);
    playWrongSound();
    isGameOn = false;
  } 
}
//handle button clicks

function handleClick(event) {
  if (isSimonTurn === true || isGameOn === false){
    return;
  }
  var colorClicked = event.target.id;
  userPlays(colorClicked);
}

$("#green").click(handleClick);
$("#red").click(handleClick);
$("#blue").click(handleClick);
$("#yellow").click(handleClick);

//detect keyboard click to start game.
function startGame(){
  if (isGameOn === false){
    gameSequencePlayed = [];
    userSequencePlayed = [];
    isGameOn = true;
    simonTurn();
  }
}
$(document).keydown(startGame);
$(".underline").click(startGame);

