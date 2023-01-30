"use strict";

// initialize variables
const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  let previousPlayer = "";
  let previousMarker = "";
  let currentPlayer = "";
  let currentMarker = "";
  let moves = 0;
  let roundOver = false;

  const mainBoard = document.querySelector(".board");
  const boxes = document.querySelectorAll(".box");
  const score = document.querySelector("#score");

  const btnReset = document.querySelector("#reset");
  btnReset.addEventListener("click", (e) => {
    mainBoard.classList.remove("disabled");
    score.textContent = "Game Start!";
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
    gameBoard.moves = 0;
    gameBoard.currentPlayer = "";
    gameBoard.currentMarker = "";
    gameBoard.roundOver = false;

    boxes.forEach((box) => {
      box.classList.remove("disabled");
      box.classList.remove("tic-tac-winner");
      box.textContent = "";
    });
  });

  const displayStatus = () => {
    if (!gameBoard.roundOver)
      gameBoard.score.textContent = `Your turn, "${gameBoard.currentMarker}"`;
    if (gameBoard.roundOver)
      gameBoard.score.textContent = `${gameBoard.previousPlayer}, "${gameBoard.previousMarker}" Won!`;
    if (!gameBoard.roundOver && gameBoard.moves == 9)
      gameBoard.score.textContent = "Draw!";
  };

  return {
    board,
    mainBoard,
    boxes,
    previousPlayer,
    previousMarker,
    currentPlayer,
    currentMarker,
    moves,
    roundOver,
    score,
    displayStatus,
  };
})();

// Player factory
const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

const winner = (function () {
  // winning combinations
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

  // determine if round is over
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
        gameBoard.mainBoard.classList.add("disabled");
        // console.log(`${combination[0]}, ${combination[1]}, ${combination[2]}`);
        gameBoard.mainBoard
          .querySelector(`div:nth-child(${combination[0] + 1})`)
          .classList.add("tic-tac-winner");
        gameBoard.mainBoard
          .querySelector(`div:nth-child(${combination[1] + 1})`)
          .classList.add("tic-tac-winner");
        gameBoard.mainBoard
          .querySelector(`div:nth-child(${combination[2] + 1})`)
          .classList.add("tic-tac-winner");
        break;
      }
    }
  };

  return { combinations, validation };
})();

const game = (function () {
  // player vs player
  const PvP = (p1, p2) => {
    const player1 = Player(p1, "X");
    const player2 = Player(p2, "O");

    gameBoard.boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        initializePlayer(player1.getName(), player1.getMarker());

        box.textContent = gameBoard.currentMarker;
        box.classList.add("disabled");

        gameBoard.board.splice(box.dataset.index, 1, gameBoard.currentMarker);

        playerSwitcher(
          player1.getName(),
          player1.getMarker(),
          player2.getName(),
          player2.getMarker()
        );
        winner.validation();
        gameBoard.displayStatus();
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
    gameBoard.moves++;
    gameBoard.previousPlayer = gameBoard.currentPlayer;
    gameBoard.previousMarker = gameBoard.currentMarker;
    gameBoard.currentPlayer =
      gameBoard.currentPlayer == player1Name ? player2Name : player1Name;
    gameBoard.currentMarker =
      gameBoard.currentMarker == player1Marker ? player2Marker : player1Marker;
  }

  return { PvP, PvC };
})();

//
const screenManager = (() => {
  const screenOne = document.querySelector(".screen-one");
  const screenTwo = document.querySelector(".screen-two");
  const mainSreen = document.querySelector(".main-screen");

  const pvpForm = document.querySelector("#player-player-form");

  const btnPvP = document.querySelector("#button-pvp");

  btnPvP.addEventListener("click", (e) => {
    screenOne.classList.add("hidden");
    screenTwo.classList.remove("hidden");
  });

  pvpForm.addEventListener("submit", (e) => {
    let playerOne = document.querySelector("#playerOne").value;
    let playerTwo = document.querySelector("#playerTwo").value;

    screenTwo.classList.add("hidden");
    mainSreen.classList.remove("hidden");

    game.PvP(playerOne, playerTwo);

    e.preventDefault();
  });
})();
