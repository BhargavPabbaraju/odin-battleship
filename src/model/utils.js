function getRandomNumber(min = 0, max = 10) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function getRandomCell(size, cellsToDiscard) {
  let row;
  let col;
  do {
    row = getRandomNumber(0, size - 1);
    col = getRandomNumber(0, size - 1);
  } while (cellsToDiscard.has([row, col].toString()));
  return [row, col];
}
