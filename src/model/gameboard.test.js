import { Gameboard, Direction } from "./gameboard";
import { ships } from "./ship";

describe("Recieve attack tests", () => {
  test("Attack adds to clicked cells", () => {
    const gameboard = new Gameboard();
    expect(gameboard.receiveAttack(0, 0)).toBeFalsy();
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
  test("ship goes out of bounds horizontal", () => {
    expect(() =>
      gameboard.initializeShip(8, 8, Direction.HORIZONTAL, ships.CARRIER),
    ).toThrow(`Ship goes out of bounds`);
  });
  test("ship goes out of bounds vertical", () => {
    expect(() =>
      gameboard.initializeShip(8, 8, Direction.VERTICAL, ships.CARRIER),
    ).toThrow(`Ship goes out of bounds`);
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

describe("All ships sunk test", () => {
  const gameboard = new Gameboard();
  gameboard.initializeShips();
  test("Not sunk", () => {
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(3, 4);
    expect(gameboard.allShipsSunk()).toBeFalsy();
  });
  test("Patrol boat sunk, all did not", () => {
    const ship = gameboard.ships.PATROL_BOAT;
    gameboard.receiveAttack(0, 3);
    gameboard.receiveAttack(0, 4);
    expect(ship.isSunk()).toBeTruthy();
    expect(gameboard.allShipsSunk()).toBeFalsy();
  });
  test("Carrier sunk, all did not", () => {
    const ship = gameboard.ships.CARRIER;
    gameboard.receiveAttack(8, 1);
    gameboard.receiveAttack(8, 2);
    gameboard.receiveAttack(8, 3);
    gameboard.receiveAttack(8, 4);
    gameboard.receiveAttack(8, 5);
    expect(ship.isSunk()).toBeTruthy();
    expect(gameboard.allShipsSunk()).toBeFalsy();
  });
  test("Destroyer sunk, all did not", () => {
    const ship = gameboard.ships.DESTROYER;
    gameboard.receiveAttack(6, 2);
    gameboard.receiveAttack(6, 3);
    gameboard.receiveAttack(6, 4);
    expect(ship.isSunk()).toBeTruthy();
    expect(gameboard.allShipsSunk()).toBeFalsy();
  });
  test("Submarine sunk, all did not", () => {
    const ship = gameboard.ships.SUBMARINE;
    gameboard.receiveAttack(2, 0);
    gameboard.receiveAttack(3, 0);
    gameboard.receiveAttack(4, 0);
    expect(ship.isSunk()).toBeTruthy();
    expect(gameboard.allShipsSunk()).toBeFalsy();
  });
  test("Battleship sunk, all ships sunk", () => {
    const ship = gameboard.ships.BATTLESHIP;
    expect(ship.getRemainingHits()).toBe(4);
    expect(gameboard.receiveAttack(3, 8)).toBeTruthy();
    expect(ship.getRemainingHits()).toBe(3);
    gameboard.receiveAttack(4, 8);
    expect(ship.getRemainingHits()).toBe(2);
    gameboard.receiveAttack(5, 8);
    expect(ship.getRemainingHits()).toBe(1);
    gameboard.receiveAttack(6, 8);
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
    expect(gameboard.allShipsSunk()).toBeTruthy();
  });
  test("All ships sunk", () => {
    expect(gameboard.ships.BATTLESHIP).toBeTruthy();
    expect(gameboard.ships.CARRIER).toBeTruthy();
    expect(gameboard.ships.SUBMARINE).toBeTruthy();
    expect(gameboard.ships.DESTROYER).toBeTruthy();
    expect(gameboard.ships.PATROL_BOAT).toBeTruthy();
    expect(gameboard.allShipsSunk()).toBeTruthy();
  });
});
