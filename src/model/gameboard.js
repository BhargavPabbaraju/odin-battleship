import { ships } from "./ship";

export const Direction = {
  HORIZONTAL: 0,
  VERTICAL: 1,
};

class ArraySet extends Set {
  add(arr) {
    super.add(arr.toString());
  }

  has(arr) {
    return super.has(arr.toString());
  }
}

export class Gameboard {
  constructor(size = 10, ship = ships) {
    this.size = size;
    this.ships = ship;
    this.clickedCells = new ArraySet();
    this.board = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let i = 0; i < size; i++) {
        row.push(null);
      }
      this.board.push(row);
    }
  }
}

Object.assign(Gameboard.prototype, {
  receiveAttack(row, col) {
    if (row < 0 || row >= this.size) {
      throw new Error(`row must be between 0 and ${this.size - 1}`);
    }
    if (col < 0 || col >= this.size) {
      throw new Error(`col must be between 0 and ${this.size - 1}`);
    }
    if (this.clickedCells.has([row, col])) {
      throw new Error("Cell already clicked");
    } else {
      this.clickedCells.add([row, col]);
      const ship = this.at(row, col);
      if (ship !== null) {
        ship.hit();
      }
    }
  },
  at(row, col) {
    if (row < 0 || row >= this.size) {
      throw new Error(`row must be between 0 and ${this.size - 1}`);
    }
    if (col < 0 || col >= this.size) {
      throw new Error(`col must be between 0 and ${this.size - 1}`);
    }
    return this.board[row][col];
  },
  initializeShip(startRow, startCol, direction, ship) {
    if (startRow < 0 || startRow >= this.size) {
      throw new Error(`startRow must be between 0 and ${this.size - 1}`);
    }
    if (startCol < 0 || startCol >= this.size) {
      throw new Error(`startCol must be between 0 and ${this.size - 1}`);
    }
    switch (direction) {
      case Direction.HORIZONTAL:
        if (startCol + ship.size >= this.size) {
          throw new Error("Ship goes out of bounds");
        }

        for (let col = startCol; col < startCol + ship.size; col++) {
          this.board[startRow][col] = ship;
        }
        break;
      case Direction.VERTICAL:
        if (startRow + ship.size >= this.size) {
          throw new Error("Ship goes out of bounds");
        }
        for (let row = startRow; row < startRow + ship.size; row++) {
          this.board[row][startCol] = ship;
        }
        break;
      default:
        throw new Error("Invalid direction");
    }
  },
  initializeShips() {
    this.initializeShip(8, 1, Direction.HORIZONTAL, this.ships.CARRIER);
    this.initializeShip(3, 8, Direction.VERTICAL, this.ships.BATTLESHIP);
    this.initializeShip(2, 0, Direction.VERTICAL, this.ships.SUBMARINE);
    this.initializeShip(6, 2, Direction.HORIZONTAL, this.ships.DESTROYER);
    this.initializeShip(0, 3, Direction.HORIZONTAL, this.ships.PATROL_BOAT);
  },
});
