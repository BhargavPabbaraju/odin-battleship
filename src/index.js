import "./styles.css";
import * as view from "./view/index.js";
import { Player } from "./model/player.js";

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
    if (state.turn !== this.isPlayerTurn) {
      return;
    }
    const cell = event.target;
    const [_, row, col] = cell.id.split("-").map(Number);
    cell.removeEventListener("click", controller.clickCell);
    play(row, col, state.player);
    state.changeTurn();
    computerPlay();
  },
};

function play(row, col, player) {
  const opponent = player === state.player ? "computer" : "player";

  const { state: cellState, positions } =
    player === state.player
      ? state.computer.play(row, col)
      : state.player.play(row, col);

  view.renderPlayedCell(row, col, opponent, cellState, positions);
  view.renderActiveShips("player", state.player.getActiveShips());
  view.renderActiveShips("computer", state.computer.getActiveShips());
}

function computerPlay() {
  const [row, col] = state.player.getRandomCell();
  play(row, col, state.computer);
  state.changeTurn();
}

window.controller = controller;
view.renderInitialContent(state.player.gameboard);
view.renderActiveShips("player", state.player.getActiveShips());
view.renderActiveShips("computer", state.computer.getActiveShips());
