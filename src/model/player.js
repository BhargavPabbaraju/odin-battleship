import { Gameboard } from "./gameboard";

export class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }
}

Object.assign(Player.prototype, {
  play(row, col) {
    this.gameboard.receiveAttack(row, col);
  },
});
