//vidalma 2020
$(document).ready(function(){
let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStart = false;

function playSound (someColor){
  switch (someColor) {
  case "red":
    var red = new Audio("sounds/red.mp3");
    red.play();
    break;
  case "blue":
    var blue = new Audio("sounds/blue.mp3");
    blue.play();
    break;
  case "green":
    var green = new Audio("sounds/green.mp3");
    green.play();
    break;
  case "yellow":
    var yellow = new Audio("sounds/yellow.mp3");
    yellow.play();
    break;
    case "wrong":
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;
  default:
}
}

function animPress(currentColor) {
  var activeColor = document.querySelector("#" + currentColor);
$(activeColor).addClass("pressed");

  setTimeout (function() {
  $(activeColor).removeClass("pressed");
}, 200);
}
$(document).keypress(function() {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout (function() {
    $("body").removeClass("game-over");
  }, 200);
$("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
  playSound(wrong);

  }

}

function startOver() {
level = 0;
gamePattern = [];
gameStart = false;

}

function nextSequence(){
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  function getRandomNum(min = 0, max = 0) {
    return Math.floor(Math.random() * max + min);
  }
  const randomNumber = getRandomNum(0,4);
  const randomChosenColor = buttonColors[getRandomNum(0,4)];
  gamePattern.push(randomChosenColor);
  var theColor = "#"+randomChosenColor;
  $(theColor).fadeOut(200).fadeIn(100);

  playSound(randomChosenColor);
}

$("div.btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  var lastItem = userClickedPattern.length - 1;

  playSound(userChosenColor);
  animPress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

});
