"use strict";

// initialize variables
const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer;
  let currentMarker;
  let moves = 0;
  let roundWinner;

  const container = document.querySelector(".board");
  const boxes = document.querySelectorAll(".box");

  return {
    board,
    container,
    boxes,
    currentPlayer,
    currentMarker,
    moves,
    roundWinner,
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
        gameBoard.roundWinner = gameBoard.currentPlayer;
        console.log(`${one} ${two} ${three}`);
        console.log(
          `winner ${gameBoard.currentPlayer} ${gameBoard.currentMarker}`
        );
        gameBoard.container.classList.add("disabled");
        break;
      }
      if (gameBoard.roundWinner == undefined && gameBoard.moves == 9) {
        console.log("draw");
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

    initializePlayer(player1.getName(), player1.getMarker());

    console.log(gameBoard.currentMarker);

    gameBoard.boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        box.textContent = gameBoard.currentMarker;
        box.classList.add("disabled");

        gameBoard.moves++;

        gameBoard.board.splice(box.dataset.index, 1, gameBoard.currentMarker);

        console.log(
          `${gameBoard.currentPlayer}, "${gameBoard.currentMarker}" marked index ${box.dataset.index}`
        );

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
    gameBoard.currentPlayer = playerName;
    gameBoard.currentMarker = playerMarker;
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
