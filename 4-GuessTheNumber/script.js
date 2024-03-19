const form = document.querySelector("form");
const submit = document.querySelector("#subt");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");
const userInput = document.querySelector(".guessField");
const p = document.createElement("p");
let prevGuess = [];
let numGuesses = 1;
let playGame = true;
let randomNumber = Math.floor(Math.random() * 20) + 1;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    let userInputValue = parseInt(userInput.value);
    validate(userInputValue);
  });
}

function validate(guess) {
  //validate the input value
  if (guess <= 0 || guess > 20 || guess === "" || isNaN(guess)) {
    displayMessage("Please enter a valid number in the range 1-100");
    userInput.value = "";
  } else {
    prevGuess.push(guess);
    if (numGuesses >= 10) {
      displayGuess();
      displayMessage(`Game over! Random number was ${randomNumber}`);
      endGame();
    } else {
      //the user has some guesses left
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right.`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number is Too low.`);
  } else {
    displayMessage(`Number is Too high.`);
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML = prevGuess.flat();
  numGuesses++;
  remaining.innerHTML = `${11 - numGuesses}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}
function endGame() {
  playGame = false;
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<span id="newGame">Start New Game</span>`;
  startOver.appendChild(p);
  newGame();
}

function newGame() {
  const newGame = document.querySelector("#newGame");
  newGame.addEventListener("click", (e) => {
    prevGuess = [];
    randomNumber = Math.floor(Math.random() * 20) + 1;
    numGuesses = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuesses}`;
    lowOrHi.innerHTML = "";
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
  });
}
