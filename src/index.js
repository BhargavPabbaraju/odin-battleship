import "./styles.css";
import { renderInitialContent } from "./view/index.js";
import { Player } from "./model/player.js";

const state = {
  player: new Player(),
  computer: new Player(),
  turn: 0,
};

renderInitialContent(state.player.gameboard.size);
