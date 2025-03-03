import { Gameboard } from "./gameboard";
import { CellState, getRandomCell } from "../utils";
import { ArraySet } from "../utils";

export class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.gameboard.initializeShips();
    this.hangingCells = new ArraySet();
  }
}

Object.assign(Player.prototype, {
  play(row, col) {
    const { state, positions } = this.gameboard.receiveAttack(row, col);
    if (state === CellState.HAS_SHIP) {
      this.hangingCells.add([row, col]);
    }
    if (state === CellState.SHIP_SUNK) {
      positions.forEach(([r, c]) => {
        this.hangingCells.delete([r, c]);
      });
    }
    return { state, positions };
  },
  getRandomCell(row = -1, col = -1) {
    if (row === -1 || col === -1) {
      const adjacent = this.tryAdjacentCells();
      if (adjacent) {
        return adjacent;
      }
      [row, col] = getRandomCell(
        this.gameboard.size,
        this.gameboard.clickedCells,
      );
    }
    return [row, col];
  },
  getActiveShips() {
    return this.gameboard.activeShips;
  },
  tryAdjacentCells() {
    const directions = [
      [0, -1], // left
      [0, 1], // right
      [1, 0], // down
      [-1, 0], // up
    ];

    for (let key of this.hangingCells) {
      const [r, c] = key.split(",").map(Number);
      for (let [dr, dc] of directions) {
        const newRow = r + dr;
        const newCol = c + dc;
        if (
          newRow >= 0 &&
          newRow < this.gameboard.size &&
          newCol >= 0 &&
          newCol < this.gameboard.size &&
          !this.gameboard.clickedCells.has([newRow, newCol])
        ) {
          return [newRow, newCol];
        }
      }
    }
  },
});
