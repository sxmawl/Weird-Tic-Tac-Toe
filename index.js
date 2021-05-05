let gameState = "true";

let player = "X";

let cellMatrix = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];
let bigWinCases = ["", "", "", "", "", "", "", "", ""];

function win() {
  return "Player " + player + " has won the game. Click on the Restart Button.";
}

function draw() {
  return "It's a Draw.";
}

function playerTurn() {
  return "It's " + player + "'s turn.";
}

const turn = document.querySelector(".game-status");
var allBox = document.querySelectorAll(".game-box");
document.querySelector(".restart-btn").addEventListener("click", restartFunc);
document.querySelector(".game-box").style.backgroundColor = "#f5cebe";

for (let i = 0; i < 9; i++) {
  for (let b = 0; b < 9; b++) {
    allBox[i].children[b].addEventListener("click", handleClick);
  }
}

function handleClick(event) {
  const clickedBox = event.target.parentElement;
  const clickedBoxNumber = parseInt(clickedBox.getAttribute("data-box-number"));
  const clickedBoxColor = clickedBox.style.backgroundColor;
  const clickedCell = event.target;
  const clickedCellNumber = parseInt(
    clickedCell.getAttribute("data-cell-number")
  );
  if (
    cellMatrix[clickedBoxNumber][clickedCellNumber] !== "" ||
    clickedBoxColor == "" ||
    clickedBoxColor == "#f4eee8" ||
    clickedBoxColor == "dimgrey"
  ) {
    alert("You can't click on this box.");
  } else {
    handlePlay(clickedCell, clickedCellNumber, clickedBoxNumber, clickedBox);
    resultCheck();
  }
}

function handlePlay(
  clickedCell,
  clickedCellNumber,
  clickedBoxNumber,
  clickedBox
) {
  cellMatrix[clickedBoxNumber][clickedCellNumber] = player;
  clickedCell.innerHTML = player;
  document.querySelectorAll(".game-box")[
    clickedCellNumber
  ].style.backgroundColor = "#f5cebe";

  if (clickedBoxNumber == clickedCellNumber) {
    clickedBox.style.backgroundColor = "#f5cebe";
  } else {
    for (let g = 0; g < 9; g++) {
      if (g == clickedCellNumber) {
        continue;
      }
      document.querySelectorAll(".game-box")[g].style.backgroundColor =
        "#f4eee8";
      for (let p = 0; p < 9; p++) {
        document.querySelectorAll(".game-box")[g].children[
          p
        ].style.borderColor = "#f5cebe";
        document.querySelectorAll(".game-box")[g].children[p].style.color =
          "#f5cebe";
      }
    }
  }
  for (let l = 0; l <= 8; l++) {
    document.querySelectorAll(".game-box")[clickedBoxNumber].children[
      l
    ].style.borderColor = "#f5cebe";
    document.querySelectorAll(".game-box")[clickedBoxNumber].children[
      l
    ].style.color = "#f5cebe";
    document.querySelectorAll(".game-box")[clickedCellNumber].children[
      l
    ].style.borderColor = "#f4eee8";
    document.querySelectorAll(".game-box")[clickedCellNumber].children[
      l
    ].style.color = "#f4eee8";
  }
}

const winningCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resultCheck() {
  smallWin();
  bigWin();
  const clickedCell = event.target;
  const clickedCellNumber = parseInt(
    clickedCell.getAttribute("data-cell-number")
  );
  var targetColor = document.querySelectorAll(".game-box")[clickedCellNumber]
    .style.backgroundColor;
  if (targetColor == "dimgrey") {
    colorAllExceptGrey();
  }
}

function handleNextPlayer() {
  if (player == "X") {
    player = "O";
    turn.innerHTML = playerTurn();
  } else {
    player = "X";
    turn.innerHTML = playerTurn();
  }
}

function restartFunc() {
  gameState = true;
  cellMatrix = [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
  ];
  bigWinCases = ["", "", "", "", "", "", "", "", ""];
  player = "X";
  turn.innerHTML = playerTurn();
  for (let i = 0; i < document.querySelectorAll(".game-cell").length; i++) {
    var allCells = document.querySelectorAll(".game-cell");
    allCells[i].innerHTML = "";
  }
  for (let w = 1; w < 9; w++) {
    document.querySelectorAll(".game-box")[w].style.backgroundColor = "#f4eee8";

    for (let a = 0; a < 9; a++) {
      document.querySelectorAll(".game-box")[w].children[a].style.borderColor =
        "#f5cebe";
      document.querySelectorAll(".game-box")[w].children[a].style.color =
        "#f5cebe";
      document.querySelector(".game-box").children[a].style.borderColor =
        "#f4eee8";
      document.querySelector(".game-box").children[a].style.color = "#f4eee8";
    }
  }

  document.querySelector(".game-box").style.backgroundColor = "#f5cebe";
  for (let i = 0; i < 9; i++) {
    for (let b = 0; b < 9; b++) {
      allBox[i].children[b].addEventListener("click", handleClick);
    }
  }
}

function smallWin() {
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningCases[i];
    for (let q = 0; q < 9; q++) {
      let a = cellMatrix[q][winCondition[0]];
      let b = cellMatrix[q][winCondition[1]];
      let c = cellMatrix[q][winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        document.querySelectorAll(".game-box")[q].style.backgroundColor =
          "dimgrey";
        bigWinCases[q] = a;
      }
    }
  }
}

function bigWin() {
  let roundWon = false;
  for (let a = 0; a <= 7; a++) {
    const bigWinCondition = winningCases[a];
    for (let m = 0; m < 9; m++) {
      let one = bigWinCases[bigWinCondition[0]];
      let two = bigWinCases[bigWinCondition[1]];
      let three = bigWinCases[bigWinCondition[2]];
      if (one === "" || two === "" || three === "") {
        continue;
      }
      if (one == two && two == three) {
        roundWon = true;
        break;
      }
    }
  }
  if (roundWon) {
    turn.innerHTML = win();
    alert("Player " + player + " has won the game.");
    for (let i = 0; i < 9; i++) {
      for (let b = 0; b < 9; b++) {
        allBox[i].children[b].removeEventListener("click", handleClick);
      }
    }
    return;
  }
  let roundDraw = bigWinCases.includes("");
  if (!roundDraw) {
    turn.innerHTML = draw();
    gameState = false;
    return;
  }

  handleNextPlayer();
}
function colorAllExceptGrey() {
  for (let z = 0; z < 9; z++) {
    let checkGrey = document.querySelectorAll(".game-box")[z].style
      .backgroundColor;
    if (checkGrey == "dimgrey") {
      for (let t = 0; t < 9; t++) {
        document.querySelectorAll(".game-box")[z].children[
          t
        ].style.borderColor = "#f5cebe";
        document.querySelectorAll(".game-box")[z].children[t].style.color =
          "#f5cebe";
      }
    } else {
      document.querySelectorAll(".game-box")[z].style.backgroundColor =
        "#f5cebe";
      for (let y = 0; y < 9; y++) {
        document.querySelectorAll(".game-box")[z].children[
          y
        ].style.borderColor = "#f4eee8";
        document.querySelectorAll(".game-box")[z].children[y].style.color =
          "#f4eee8";
      }
    }
  }
}
