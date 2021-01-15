var gameSequencePlayed = [];
var userSequencePlayed = [];
var buttonColors = ["red", "blue", "green", "yellow"]; 
var isGameOn = false;
var isSimonTurn = true;
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
  var colorSound = new Audio(`sounds/${buttonColor}.mp3`);
  colorSound.play();
}

function playWrongSound(){
  //plays the error sound.
  playSound('wrong');
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
    }, 500);
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
  }, 500);
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
    $("#level-title").text("You lost! Press any key to play again!");
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

$(document).keydown(function () {
  if(isGameOn === false){
    gameSequencePlayed = [];
    userSequencePlayed = [];
    isGameOn = true;
    simonTurn();

  //give first random to start game
  //save randon list
  
  }
  
});

