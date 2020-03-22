let word = window.word; //word to be guessed
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

  // populating correctGuesses array
  for(var i = 0; i< wordLength; i++){
    gameState.correctGuesses[i] = "_";
  }
 
}

/**
function setTiles (id){

  var wordLength = word.length;

  for(var i = 0; i< wordLength; i++){
    gameState.correctGuesses[i] = "_";
  }

  document.getElementById(id).innerHTML = "hi";
  alert(document.getElementById(id).value);
  // wordTiles.innerHTML = gameState.correctGuesses.join(" ");

}
*/


function validate (id) {

  guess = document.getElementById(id).value;
  if(isNaN(guess) && guess.length == 1){
    alert("guess has been made: " + guess);
    check(id);
  }
  else{
    alert(guess + " is not a valid input.");
  }
}

function check (id) {

  guess = document.getElementById(id).value;
  alert(word);
  // if the letter guessed is in the word
  if(word.includes(guess)){
    // if the letter has already been guessed, ignore
    alert(guess + "is in the word!");
    if(gameState.correctGuesses.includes(guess)){
      alert("ERROR: '" + guess + "' has already been guessed. Try again");
    }
    // otherwise add to correctGuesses
    else{
      alert(guess + "will now be added to correct guesses");
      for(var i = 0; i < word.wordLength; i++ ){
        if(guess == word[i]){
          gameState.correctGuesses[i] = guess;
        }
      }
    }
  }
  // else add the letter to incorrectGuesses
  else{
    gameState.incorrectGuesses.push(guess);
    alert(gameState.incorrectGuesses.join(" "));
  }
}

function updateWordTiles (index) {
  
}

function checkEndOfGame() {
  
}

function init () {
  
}