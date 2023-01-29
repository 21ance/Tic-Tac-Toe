"use strict";

const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  return { board };
})();

const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
};

const winner = (function () {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return { combinations };
})();

const startGame = (function () {
  // player vs player
  const PvP = () => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player2.getMark();

    let moves = 0;
    let roundWinner;

    const container = document.querySelector(".board");
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        if (currentPlayer == player2.getMark()) {
          currentPlayer = player1.getMark();
        } else {
          currentPlayer = player2.getMark();
        }
        moves++;
        box.textContent = currentPlayer;

        box.classList.add("disabled");

        gameBoard.board.splice(box.dataset.index, 1, currentPlayer);

        console.log(`${currentPlayer} marked index ${box.dataset.index}`);

        for (let i = 0; i < winner.combinations.length; i++) {
          // console.log(i);
          let combination = winner.combinations[i];
          let one = gameBoard.board[combination[0]];
          let two = gameBoard.board[combination[1]];
          let three = gameBoard.board[combination[2]];

          if (
            one == currentPlayer &&
            two == currentPlayer &&
            three == currentPlayer
          ) {
            console.log(`winner is ${currentPlayer}`);
            container.classList.add("disabled");
            roundWinner = currentPlayer;
          }
          if (moves == 9 && roundWinner == undefined) {
            console.log("draw");
          }
        }
      });
    });
  };

  return { PvP };
})();

startGame.PvP();
