import { Player } from "./player";

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
