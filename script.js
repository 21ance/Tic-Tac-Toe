"use strict";

// initialize variables
const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "";
  let currentMarker = "";
  let moves = 0;
  let roundOver = false;

  const container = document.querySelector(".board");
  const boxes = document.querySelectorAll(".box");
  const score = document.querySelector("#score");

  const btnReset = document.querySelector("#reset");
  btnReset.addEventListener("click", (e) => {
    container.classList.remove("disabled");
    score.textContent = "Game Start!";
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
    gameBoard.moves = 0;
    gameBoard.currentPlayer = "";
    gameBoard.currentMarker = "";
    gameBoard.roundOver = false;

    boxes.forEach((box) => {
      box.classList.remove("disabled");
      box.textContent = "";
    });
  });

  return {
    board,
    container,
    boxes,
    currentPlayer,
    currentMarker,
    moves,
    roundOver,
    score,
  };
})();

// Player factory
const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

// array index winning combinations
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

  // winner and draw validation
  const validation = () => {
    for (let i = 0; i < combinations.length; i++) {
      let combination = combinations[i];

      let one = gameBoard.board[combination[0]];
      let two = gameBoard.board[combination[1]];
      let three = gameBoard.board[combination[2]];

      if (one == "" || two == "" || three == "") {
        continue;
      }
      if (one === two && two === three) {
        gameBoard.roundOver = true;
        gameBoard.score.textContent = `Winner: ${gameBoard.currentMarker} (${gameBoard.currentPlayer})`;

        gameBoard.container.classList.add("disabled");
        break;
      }
      if (!gameBoard.roundOver && gameBoard.moves == 9) {
        gameBoard.score.textContent = `Draw!`;
      }
    }
  };

  return { combinations, validation };
})();

const game = (function () {
  // player vs player
  const PvP = () => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    gameBoard.boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        initializePlayer(player1.getName(), player1.getMarker());

        box.textContent = gameBoard.currentMarker;
        box.classList.add("disabled");

        gameBoard.moves++;

        gameBoard.board.splice(box.dataset.index, 1, gameBoard.currentMarker);

        if (gameBoard.roundOver) return;
        gameBoard.score.textContent = `Your turn: "${gameBoard.currentMarker}"`;

        winner.validation();

        playerSwitcher(
          player1.getName(),
          player1.getMarker(),
          player2.getName(),
          player2.getMarker()
        );
      });
    });
  };

  // player vs computer
  const PvC = () => {
    //
  };

  // reusable helper functions, ie: PvP and PvC
  function initializePlayer(playerName, playerMarker) {
    if (gameBoard.currentPlayer == "" || gameBoard.currentMarker == "") {
      gameBoard.currentPlayer = playerName;
      gameBoard.currentMarker = playerMarker;
    }
  }

  function playerSwitcher(
    player1Name,
    player1Marker,
    player2Name,
    player2Marker
  ) {
    gameBoard.currentPlayer =
      gameBoard.currentPlayer == player1Name ? player2Name : player1Name;
    gameBoard.currentMarker =
      gameBoard.currentMarker == player1Marker ? player2Marker : player1Marker;
  }

  return { PvP, PvC };
})();

game.PvP();
