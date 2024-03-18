let buttons = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
const newGameBtn = document.querySelector(".new-btn");
const messageContainer = document.querySelector(".message-container");
const message = document.querySelector("#message");

let turnO = true; //game starts with O.
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let emptyBoxesCount = 9;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    findWinner(button);
  });
});
resetBtn.addEventListener("click", () => resetGame());
newGameBtn.addEventListener("click", () => resetGame());

const findWinner = (button) => {
  if (turnO) {
    button.innerText = "O";
    turnO = false; //once O is done, next turn should be for X. Creates the toggling effect
  } else {
    button.innerText = "X";
    turnO = true;
  }
  button.disabled = true;
  emptyBoxesCount--;
  let winner = checkWinner();
};

const checkWinner = () => {
  let isWinner = false;
  for (let pattern of winningPatterns) {
    let pos1Text = buttons[pattern[0]].innerText;
    let pos2Text = buttons[pattern[1]].innerText;
    let pos3Text = buttons[pattern[2]].innerText;
    if (pos1Text != "" && pos2Text != "" && pos3Text != "") {
      if (pos1Text === pos2Text && pos2Text === pos3Text) {
        isWinner = true;
        displayWinner(pos1Text);
        // return true;
      }
    }
  }
  if (emptyBoxesCount === 0 && !isWinner) drawGame();
};
const drawGame = () => {
  messageContainer.classList.remove("hide");
  message.innerText = `The Game is draw !!`;
  //once we get a winner the remaining buttons have to be disabled.
  disableButtons();
};
const displayWinner = (winner) => {
  messageContainer.classList.remove("hide");
  message.innerText = `Congratulations the winner is ${winner} !!`;
  //once we get a winner the remaining buttons have to be disabled.
  disableButtons();
};
const disableButtons = () => {
  for (let btn of buttons) {
    btn.disabled = true;
  }
};
const resetGame = () => {
  turnO = true;
  messageContainer.classList.add("hide");
  //   message.innerText = "";
  enableButtons();
};

const enableButtons = () => {
  for (let btn of buttons) {
    btn.disabled = false;
    btn.innerText = "";
  }
};
