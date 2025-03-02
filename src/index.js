import "./styles.css";
import { renderInitialContent } from "./view/index.js";
import { Player } from "./model/player.js";
import { icons, renderIcon } from "./view/icons.js";

const state = {
  player: new Player(),
  computer: new Player(),
  turn: 0,
};

renderInitialContent(state.player.gameboard);

function getRowColFromId(id) {
  const row = id.split("-")[1];
  const col = id.split("-")[2];
  return [row, col];
}

const controller = {
  clickCell(id) {
    console.log(id);
    const cell = document.getElementById(id);
    const [row, col] = getRowColFromId(id);
    state.computer.gameboard.at(row, col)
      ? cell.appendChild(renderIcon(icons.SHIP))
      : cell.appendChild(renderIcon(icons.WATER));
  },
};

window.controller = controller;
