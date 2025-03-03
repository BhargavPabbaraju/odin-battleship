export const CellState = {
  HAS_SHIP: 0,
  WATER: 1,
  SHIP_SUNK: 2,
};

export class ArraySet extends Set {
  add(arr) {
    super.add(this.#formatKey(arr));
  }

  has(arr) {
    return super.has(this.#formatKey(arr));
  }

  delete(arr) {
    return super.delete(this.#formatKey(arr));
  }

  #formatKey(arr) {
    return arr.join(",");
  }
}

function getRandomNumber(min = 0, max = 10) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function getRandomCell(size, cellsToDiscard) {
  let row;
  let col;
  do {
    row = getRandomNumber(0, size - 1);
    col = getRandomNumber(0, size - 1);
  } while (cellsToDiscard.has([row, col]));

  return [row, col];
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
