let word = window.word; //word to be guessed
let guess = window.guess;
let gameState = {	
  correctGuesses : [],   // may be use to store info relating to correct guesses, e.g. letters or indexes 
  incorrectGuesses : [], // store incorrect letters
  remainingGuesses : 10,  // keep track of number of attempts
};

function setWord () {

  word = prompt("Enter a word to be guessed: ");
  
  if(word.length > 0 && word.length < 15){
    alert("Word set to: " + word);
  }
  else{
    alert("ERROR: " + word + " is tooooo long");
    word = window.word;
  }
 
}

function setTiles (){

  var wordLength = word.length;

  for(var i = 0; i< wordLength; i++){
    gameState.correctGuesses[i] = "-";
  }

  document.getElementById("currentGuess").innerText = "hello";

}


function validate () {
  guess = document.getElementById('guess').value;
  if(isNaN(guess)){
    check(guess);
  }
  else{
    alert(guess + " is not valid input. letters only !");
  }
}

function check (guess) {

}

function updateWordTiles (index) {
  
}

function checkEndOfGame() {
  
}

function init () {
  
}