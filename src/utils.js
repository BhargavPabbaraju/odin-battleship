export const CellState = {
  HAS_SHIP: 0,
  WATER: 1,
  SHIP_SUNK: 2,
};

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
