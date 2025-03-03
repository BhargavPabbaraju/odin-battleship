import { Computer, Player } from "./player";

test("play invalid row", () => {
  const player = new Player();
  expect(() => player.play(-1, 0)).toThrow();
});

test("play invalid column", () => {
  const player = new Player();
  expect(() => player.play(0, 10)).toThrow();
});

test("play already played cell", () => {
  const player = new Player();
  player.play(0, 0);
  expect(() => player.play(0, 0)).toThrow();
});

test("get random cell does not give same cell twice", () => {
  const computer = new Player();
  computer.getRandomCell(0, 0);
  computer.play(0, 0);
  for (let i = 0; i < 20; i++) {
    let [row, col] = computer.getRandomCell();
    computer.play(row, col);
    expect([row, col].toString()).not.toBe([0, 0].toString());
  }
});

test("Try adjacent cells", () => {
  const computer = new Player();
  computer.gameboard.initializeShips();
  const ship = computer.gameboard.ships.BATTLESHIP;
  computer.play(4, 8);
  expect(ship.hits).toEqual(1);
  expect(computer.hangingCells.has([4, 8])).toBeTruthy();
  let adjacent = computer.getRandomCell();
  expect(adjacent).toEqual([4, 7]);
  computer.play(4, 7);
  expect(ship.hits).toEqual(1);
  expect(computer.hangingCells.has([4, 7])).toBeFalsy();
  adjacent = computer.getRandomCell();
  expect(adjacent).toEqual([4, 9]);
  computer.play(4, 9);
  expect(ship.hits).toEqual(1);
  expect(computer.hangingCells.has([4, 9])).toBeFalsy();
  adjacent = computer.getRandomCell();
  expect(adjacent).toEqual([5, 8]);
  computer.play(5, 8);
  expect(ship.hits).toEqual(2);
  expect(computer.hangingCells.has([5, 8])).toBeTruthy();
  adjacent = computer.getRandomCell();
  expect(adjacent).toEqual([3, 8]);
  computer.play(3, 8);
  expect(ship.hits).toEqual(3);
  expect(computer.hangingCells.has([3, 8])).toBeTruthy();
  adjacent = computer.getRandomCell();
});
