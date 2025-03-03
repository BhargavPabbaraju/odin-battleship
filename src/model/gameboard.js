import { Ship, ShipType } from "./ship";
import { CellState } from "../utils";
import { ArraySet } from "../utils";

export const Direction = {
  HORIZONTAL: 0,
  VERTICAL: 1,
};

export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.ships = {
      CARRIER: new Ship(ShipType.CARRIER[0], ShipType.CARRIER[1]),
      BATTLESHIP: new Ship(ShipType.BATTLESHIP[0], ShipType.BATTLESHIP[1]),
      DESTROYER: new Ship(ShipType.DESTROYER[0], ShipType.DESTROYER[1]),
      SUBMARINE: new Ship(ShipType.SUBMARINE[0], ShipType.SUBMARINE[1]),
      PATROL_BOAT: new Ship(ShipType.PATROL_BOAT[0], ShipType.PATROL_BOAT[1]),
    };
    this.clickedCells = new ArraySet();
    this.activeShips = Object.keys(this.ships).length;
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
        if (ship.isSunk()) {
          this.activeShips--;
          return { state: CellState.SHIP_SUNK, positions: ship.positions };
        }

        return { state: CellState.HAS_SHIP, positions: [[row, col]] };
      }
      return { state: CellState.WATER, positions: [[row, col]] };
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
    ship.positions = [];
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
          if (this.at(startRow, col) !== null) {
            throw new Error("Ship overlaps with an existing ship");
          }
          const directions = [
            [0, -1], // left
            [0, 1], // right
            [1, 0], // down
            [-1, 0], // up
          ];
          for (let [dr, dc] of directions) {
            const newRow = startRow + dr;
            const newCol = col + dc;
            if (
              newRow >= 0 &&
              newRow < this.size &&
              newCol >= 0 &&
              newCol < this.size &&
              this.at(newRow, newCol) !== null
            ) {
              throw new Error("Ship sides with an existing ship");
            }
          }
        }

        for (let col = startCol; col < startCol + ship.size; col++) {
          this.board[startRow][col] = ship;
          ship.positions.push([startRow, col]);
        }
        break;
      case Direction.VERTICAL:
        if (startRow + ship.size >= this.size) {
          throw new Error("Ship goes out of bounds");
        }
        for (let row = startRow; row < startRow + ship.size; row++) {
          if (this.at(row, startCol) !== null) {
            throw new Error("Ship overlaps with an existing ship");
          }
          const directions = [
            [0, -1], // left
            [0, 1], // right
            [1, 0], // down
            [-1, 0], // up
          ];
          for (let [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = startCol + dc;
            if (
              newRow >= 0 &&
              newRow < this.size &&
              newCol >= 0 &&
              newCol < this.size &&
              this.at(newRow, newCol) !== null
            ) {
              throw new Error("Ship sides with an existing ship");
            }
          }
        }
        for (let row = startRow; row < startRow + ship.size; row++) {
          this.board[row][startCol] = ship;
          ship.positions.push([row, startCol]);
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
  allShipsSunk() {
    return Object.values(this.ships).reduce(
      (prev, ship) => ship.isSunk() && prev,
      true,
    );
  },
});
