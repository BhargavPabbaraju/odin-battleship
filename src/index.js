import "./styles.css";
import * as view from "./view/index.js";
import { Player } from "./model/player.js";
import { CellState, delay } from "./utils.js";

const state = {
  player: new Player(),
  computer: new Player(),
  isPlayerTurn: true,
  changeTurn() {
    this.isPlayerTurn = !this.isPlayerTurn;
  },
};

const controller = {
  clickCell(event) {
    if (!state.isPlayerTurn) {
      return;
    }
    const cell = event.target;
    const [_, row, col] = cell.id.split("-").map(Number);
    cell.removeEventListener("click", controller.clickCell);
    play(row, col, state.player);
    computerPlay();
  },
};

async function play(row, col, player) {
  return new Promise((resolve) => {
    const opponent = player === state.player ? "computer" : "player";

    const { state: cellState, positions } =
      player === state.player
        ? state.computer.play(row, col)
        : state.player.play(row, col);

    view.renderPlayedCell(row, col, opponent, cellState, positions);
    view.renderActiveShips("player", state.player.getActiveShips());
    view.renderActiveShips("computer", state.computer.getActiveShips());
    if (cellState === CellState.WATER) {
      state.changeTurn();
    }
    if (state.player.getActiveShips() < 1) {
      gameOver("Computer");
    }
    if (state.computer.getActiveShips() < 1) {
      gameOver("Player");
    }
    setTimeout(() => resolve(cellState), 500);
  });
}

async function computerPlay() {
  while (!state.isPlayerTurn) {
    let [row, col] = state.player.getRandomCell();
    await play(row, col, state.computer);
    await delay(500);
  }
}

function gameOver(winner) {
  state.isPlayerTurn = true;
  for (let row = 0; row < state.player.gameboard.size; row++) {
    for (let col = 0; col < state.player.gameboard.size; col++) {
      const cell = document.getElementById(`computer-${row}-${col}`);
      cell.removeEventListener("click", controller.clickCell);
    }
  }
  const header = document.getElementById("header");
  header.innerText = `${winner} Wins!`;
  header.style.fontSize = "48px";
  const restartButton = document.getElementById("restart-button");
  restartButton.style.display = "block";
}

function restartGame() {
  state.player = new Player();
  state.computer = new Player();
  state.isPlayerTurn = true;
  state.player.randomizeShips();
  state.computer.randomizeShips();
  view.renderActiveShips("player", state.player.getActiveShips());
  view.renderActiveShips("computer", state.computer.getActiveShips());
  view.renderInitialContent(state.player.gameboard);
}

function main() {
  window.controller = controller;
  state.player.randomizeShips();
  state.computer.randomizeShips();

  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", restartGame);

  view.renderInitialContent(state.player.gameboard);
  view.renderActiveShips("player", state.player.getActiveShips());
  view.renderActiveShips("computer", state.computer.getActiveShips());
}

main();
