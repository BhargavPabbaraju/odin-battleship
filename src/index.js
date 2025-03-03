import "./styles.css";
import { renderInitialContent } from "./view/index.js";
import { Player, Computer } from "./model/player.js";
import { icons, renderIcon } from "./view/icons.js";

const state = {
  player: new Player(),
  computer: new Computer(),
  turn: 0,
  changeTurn() {
    this.turn = (this.turn + 1) % 2;
  },
};

const controller = {
  clickCell(event) {
    if (state.turn !== 0) {
      return;
    }
    const cell = event.target;
    const [_, row, col] = cell.id.split("-").map(Number);
    cell.removeEventListener("click", controller.clickCell);
    state.computer.gameboard.at(row, col)
      ? cell.appendChild(renderIcon(icons.SHIP))
      : cell.appendChild(renderIcon(icons.WATER));
    cell.style.color = "blue";
    state.changeTurn();
    computerPlay();
  },
};

function computerPlay() {
  const [row, col] = state.computer.play();
  const cell = document.getElementById(`player-${row}-${col}`);
  if (!state.player.gameboard.at(row, col)) {
    cell.appendChild(renderIcon(icons.WATER));
  }
  cell.style.color = "red";
  state.changeTurn();
}

window.controller = controller;
renderInitialContent(state.player.gameboard);
