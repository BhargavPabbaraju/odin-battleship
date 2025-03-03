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
