import { Gameboard, Direction } from "./gameboard";
import { ships } from "./ship";

describe("Recieve attack tests", () => {
  test("Attack adds to clicked cells", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    expect(gameboard.clickedCells).toContainEqual([0, 0].toString());
  });

  test("Attack already clicked cell throws error", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    expect(gameboard.clickedCells).toContainEqual([0, 0].toString());
    expect(() => gameboard.receiveAttack(0, 0)).toThrow("Cell already clicked");
  });
  test("Invalid row negative", () => {
    const gameboard = new Gameboard();
    expect(() => gameboard.receiveAttack(-1, 0)).toThrow(
      `row must be between 0 and ${gameboard.size - 1}`,
    );
  });
  test("Invalid row greather than size", () => {
    const gameboard = new Gameboard();
    expect(() => gameboard.receiveAttack(10, 0)).toThrow(
      `row must be between 0 and ${gameboard.size - 1}`,
    );
  });
  test("Invalid col negative", () => {
    const gameboard = new Gameboard();
    expect(() => gameboard.receiveAttack(0, -129)).toThrow(
      `col must be between 0 and ${gameboard.size - 1}`,
    );
  });
  test("Invalid col greather than size", () => {
    const gameboard = new Gameboard();
    expect(() => gameboard.receiveAttack(0, 10)).toThrow(
      `col must be between 0 and ${gameboard.size - 1}`,
    );
  });
});

test("Number of ships", () => {
  const gameboard = new Gameboard();
  expect(Object.keys(gameboard.ships).length).toBe(5);
});

describe("Initialize ship test", () => {
  const gameboard = new Gameboard();
  test("invalid startRow negative", () => {
    expect(() =>
      gameboard.initializeShip(-1, 0, Direction.HORIZONTAL, ships.CARRIER),
    ).toThrow(`startRow must be between 0 and ${gameboard.size - 1}`);
  });
  test("invalid startRow greater than size", () => {
    expect(() =>
      gameboard.initializeShip(1200, 0, Direction.HORIZONTAL, ships.CARRIER),
    ).toThrow(`startRow must be between 0 and ${gameboard.size - 1}`);
  });
  test("invalid startCol negative", () => {
    expect(() =>
      gameboard.initializeShip(0, -1, Direction.HORIZONTAL, ships.CARRIER),
    ).toThrow(`startCol must be between 0 and ${gameboard.size - 1}`);
  });
  test("invalid startCol greater than size", () => {
    expect(() =>
      gameboard.initializeShip(0, 1290, Direction.HORIZONTAL, ships.CARRIER),
    ).toThrow(`startCol must be between 0 and ${gameboard.size - 1}`);
  });
  test("invalid direction", () => {
    expect(() => gameboard.initializeShip(0, 0, "asbd", ships.CARRIER)).toThrow(
      `Invalid direction`,
    );
  });
});

describe("At tests", () => {
  const gameboard = new Gameboard();
  test("Invalid row negative", () => {
    expect(() => gameboard.at(-1, 0)).toThrow(
      `row must be between 0 and ${gameboard.size - 1}`,
    );
  });
  test("Invalid row greater than size", () => {
    expect(() => gameboard.at(1209, 0)).toThrow(
      `row must be between 0 and ${gameboard.size - 1}`,
    );
  });
  test("Invalid col negative", () => {
    expect(() => gameboard.at(0, -1)).toThrow(
      `col must be between 0 and ${gameboard.size - 1}`,
    );
  });
  test("Invalid col greater than size", () => {
    expect(() => gameboard.at(0, 12321)).toThrow(
      `col must be between 0 and ${gameboard.size - 1}`,
    );
  });
});
