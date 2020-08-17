var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// to start the game using any keypress.
$("body").keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// function to detect the colour clicked by user.
$(".btn").click(function() {

  // creating a new var to store id of color pressed bu user.
  var userChosenColour = $(this).attr("id"); // return the id of the button which is pressed
  // now pushing this id into userclicked pattern array.
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// function to Restart the game.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// function to check the answer.
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongaudio = new Audio("wrong.mp3");
    wrongaudio.play();

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// function to give sequence of colur to user to replicate.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // animating the button.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

// function to play sound.
function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

// function to animate the color on pressing.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  // adding timeout function
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}
