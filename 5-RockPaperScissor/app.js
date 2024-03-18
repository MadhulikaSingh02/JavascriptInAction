let userScore = 0;
let compScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
let userCount = document.querySelector("#user-score");
let compCount = document.querySelector("#comp-score");

const generateCompChoice = (userChoice) => {
  let ch = ["rock", "paper", "scissors"];
  let compChoice = Math.floor(Math.random() * 3);
  return ch[compChoice];
};

const drawaGame = (userChoice) => {
  msg.innerText = `Game Draw. Both selected '${userChoice}'`;
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    // userScore++;
    msg.innerText = `Hoorray ! You win. Your '${userChoice}' beats '${compChoice}'`;
    msg.style.backgroundColor = "green";
    userCount.innerText = ++userScore;
  } else {
    msg.innerText = `Try again, you lose. '${compChoice}' beats your '${userChoice}'`;
    msg.style.backgroundColor = "red";
    compCount.innerText = ++compScore;
  }
};

const playGame = (userChoice) => {
  //Generate computer choice
  let compChoice = generateCompChoice();

  console.log(userChoice, compChoice);
  if (compChoice === userChoice) {
    drawaGame(userChoice);
  } else {
    let userWin = true; //to track if user is winning
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else if (userChoice === "scissors") {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    let userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
