import "./styles.css";
import { renderInitialContent } from "./view/index.js";
import { Player } from "./model/player.js";
import { icons, renderIcon } from "./view/icons.js";

const state = {
  player: new Player(),
  computer: new Player(),
  turn: 0,
};

const controller = {
  clickCell(event) {
    const cell = event.target;
    const [_, row, col] = cell.id.split("-").map(Number);
    cell.removeEventListener("click", controller.clickCell);
    state.computer.gameboard.at(row, col)
      ? cell.appendChild(renderIcon(icons.SHIP))
      : cell.appendChild(renderIcon(icons.WATER));
  },
};

window.controller = controller;
renderInitialContent(state.player.gameboard);
