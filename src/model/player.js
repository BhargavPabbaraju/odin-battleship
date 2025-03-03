import { Gameboard } from "./gameboard";
import { getRandomCell } from "./utils";

export class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.gameboard.initializeShips();
  }
}

Object.assign(Player.prototype, {
  play(row, col) {
    this.gameboard.receiveAttack(row, col);
  },
});

export class Computer extends Player {
  play(row = -1, col = -1) {
    if (row === -1 || col === -1) {
      [row, col] = getRandomCell(
        this.gameboard.size,
        this.gameboard.clickedCells,
      );
    }
    this.gameboard.receiveAttack(row, col);
    return [row, col];
  }
}
