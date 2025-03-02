export const ShipType = {
  CARRIER: ["Carrier", 5],
  BATTLESHIP: ["Battleship", 4],
  DESTROYER: ["Destroyer", 3],
  SUBMARINE: ["Submarine", 3],
  PATROL_BOAT: ["Patrol Boat", 2],
};

export class Ship {
  constructor(type, size) {
    this.type = type;
    this.size = size;
    this.hits = 0;
  }
}

Object.assign(Ship.prototype, {
  getSize() {
    return this.size;
  },
  hit() {
    if (this.size > this.hits) {
      this.hits++;
    } else {
      throw new Error("Ship already sunk");
    }
  },
  getRemainingHits() {
    return this.size - this.hits;
  },
  isSunk() {
    return this.hits === this.size;
  },
});

export const ships = {
  CARRIER: new Ship(ShipType.CARRIER[0], ShipType.CARRIER[1]),
  BATTLESHIP: new Ship(ShipType.BATTLESHIP[0], ShipType.BATTLESHIP[1]),
  DESTROYER: new Ship(ShipType.DESTROYER[0], ShipType.DESTROYER[1]),
  SUBMARINE: new Ship(ShipType.SUBMARINE[0], ShipType.SUBMARINE[1]),
  PATROL_BOAT: new Ship(ShipType.PATROL_BOAT[0], ShipType.PATROL_BOAT[1]),
};
