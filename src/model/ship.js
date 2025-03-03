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
    this.positions = [];
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
