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

const game = (function () {
	// player vs player
	const PvP = () => {
		let currentPlayer = 0;

		const player1 = Player("Player 1", "X");
		const player2 = Player("Player 2", "O");

		const boxes = document.querySelectorAll(".box");

		boxes.forEach((box) => {
			box.addEventListener("click", (e) => {
				if (currentPlayer == 0) {
					currentPlayer = player1.getMark();
				} else {
					currentPlayer = player2.getMark();
				}

				box.textContent = currentPlayer;

				console.log(currentPlayer);
				box.classList.add("disabled");

				gameBoard.board.splice(box.dataset.index, 1, currentPlayer);
				console.log(gameBoard.board);
			});
		});
	};

	return { PvP };
})();

game.PvP();
