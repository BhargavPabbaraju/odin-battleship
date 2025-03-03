import { Ship, ShipType } from "./ship";
import { CellState } from "../utils";

export const Direction = {
  HORIZONTAL: 0,
  VERTICAL: 1,
};

class ArraySet extends Set {
  add(arr) {
    super.add(this.#formatKey(arr));
  }

  has(arr) {
    return super.has(this.#formatKey(arr));
  }

  #formatKey(arr) {
    return arr.join(",");
  }
}

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
        return ship.isSunk()
          ? { state: CellState.SHIP_SUNK, positions: ship.positions }
          : { state: CellState.HAS_SHIP, positions: [[row, col]] };
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
          this.board[startRow][col] = ship;
          ship.positions.push([startRow, col]);
        }
        break;
      case Direction.VERTICAL:
        if (startRow + ship.size >= this.size) {
          throw new Error("Ship goes out of bounds");
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
