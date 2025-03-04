import { Direction, Gameboard } from "./gameboard";
import { CellState, getRandomCell, getRandomNumber } from "../utils";
import { ArraySet, Directions } from "../utils";

export class Player {
  constructor() {
    this.gameboard = new Gameboard();
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
  randomizeShips() {
    let maxAttempts = 100;
    Object.values(this.gameboard.ships).forEach((ship) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < maxAttempts) {
        const [row, col] = this.getRandomCell();
        try {
          this.gameboard.initializeShip(
            row,
            col,
            this.getRandomDirection(),
            ship,
          );
          placed = true;
        } catch (err) {
          console.log(err);
          attempts++;
        }
      }
      if (!placed) {
        throw Error(
          `Failed to place ${ship.type[0]} after ${maxAttempts} attempts`,
        );
      }
    });
  },
  getRandomDirection() {
    if (getRandomNumber(0, 1) < 1) {
      return Direction.HORIZONTAL;
    }
    return Direction.VERTICAL;
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
    if (this.hangingCells.size === 0) {
      return getRandomCell(this.gameboard.size, this.gameboard.clickedCells);
    }

    let first = true;
    let isHorizontal = false,
      isVertical = false;
    let firstRow, firstCol;

    for (let key of this.hangingCells) {
      const [r, c] = key.split(",").map(Number);

      if (first) {
        firstRow = r;
        firstCol = c;
        first = false;
      } else {
        if (r === firstRow) isHorizontal = true;
        if (c === firstCol) isVertical = true;
      }
    }

    const preferredDirections = isHorizontal
      ? [
          [0, -1],
          [0, 1],
        ]
      : isVertical
        ? [
            [-1, 0],
            [1, 0],
          ]
        : Object.values(Directions);

    for (let key of this.hangingCells) {
      const [r, c] = key.split(",").map(Number);
      for (let [dr, dc] of preferredDirections) {
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

    for (let key of this.hangingCells) {
      const [r, c] = key.split(",").map(Number);
      for (let [dr, dc] of Object.values(Directions)) {
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

    return getRandomCell(this.gameboard.size, this.gameboard.clickedCells);
  },
});
