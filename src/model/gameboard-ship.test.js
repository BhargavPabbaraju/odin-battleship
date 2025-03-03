import { Gameboard } from "./gameboard";
import { CellState } from "../utils";
import { ships } from "./ship";

describe("Carrier tests", () => {
  const gameboard = new Gameboard();
  const ship = gameboard.ships.CARRIER;
  gameboard.initializeShips();
  test("Initial position", () => {
    expect(gameboard.at(8, 1)).toBe(ship);
    expect(gameboard.at(8, 2)).toBe(ship);
    expect(gameboard.at(8, 3)).toBe(ship);
    expect(gameboard.at(8, 4)).toBe(ship);
    expect(gameboard.at(8, 5)).toBe(ship);
    expect(gameboard.at(8, 6)).not.toBe(ship);
    expect(ship.positions.sort()).toEqual(
      [
        [8, 1],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
      ].sort(),
    );
  });
  test("Hit once", () => {
    expect(gameboard.receiveAttack(8, 1).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([8, 1].join(","));
    expect(ship.hits).toBe(1);
    expect(ship.getRemainingHits()).toBe(4);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error", () => {
    expect(() => gameboard.receiveAttack(8, 1)).toThrow("Cell already clicked");
  });
  test("Hit twice", () => {
    expect(gameboard.receiveAttack(8, 2).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([8, 1].join(","));
    expect(gameboard.clickedCells).toContainEqual([8, 2].join(","));
    expect(ship.hits).toBe(2);
    expect(ship.getRemainingHits()).toBe(3);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(8, 2)).toThrow("Cell already clicked");
  });
  test("Hit thrice", () => {
    expect(gameboard.receiveAttack(8, 3).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([8, 1].join(","));
    expect(gameboard.clickedCells).toContainEqual([8, 2].join(","));
    expect(gameboard.clickedCells).toContainEqual([8, 3].join(","));
    expect(ship.hits).toBe(3);
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(8, 3)).toThrow("Cell already clicked");
  });
  test("Hit 4 times", () => {
    gameboard.receiveAttack(8, 4);
    expect(gameboard.clickedCells).toContainEqual([8, 4].join(","));
    expect(gameboard.clickedCells).toContainEqual([8, 3].join(","));
    expect(gameboard.clickedCells).toContainEqual([8, 2].join(","));
    expect(gameboard.clickedCells).toContainEqual([8, 1].join(","));
    expect(ship.hits).toBe(4);
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(8, 4)).toThrow("Cell already clicked");
  });
  test("Hit 5 times", () => {
    const { state, positions } = gameboard.receiveAttack(8, 5);
    expect(state).toBe(CellState.SHIP_SUNK);
    expect(positions.sort()).toEqual(
      [
        [8, 1],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
      ].sort(),
    );
    expect(gameboard.clickedCells).toContainEqual([8, 5].join(","));
    expect(gameboard.clickedCells).toContainEqual([8, 4].join(","));
    expect(gameboard.clickedCells).toContainEqual([8, 3].join(","));
    expect(gameboard.clickedCells).toContainEqual([8, 2].join(","));
    expect(gameboard.clickedCells).toContainEqual([8, 1].join(","));
    expect(ship.hits).toBe(5);
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(8, 5)).toThrow("Cell already clicked");
  });
});

describe("Submarine tests", () => {
  const gameboard = new Gameboard();
  const ship = gameboard.ships.SUBMARINE;
  gameboard.initializeShips();
  test("Initial position", () => {
    expect(gameboard.at(2, 0)).toBe(ship);
    expect(gameboard.at(3, 0)).toBe(ship);
    expect(gameboard.at(4, 0)).toBe(ship);
    expect(gameboard.at(5, 0)).not.toBe(ship);
    expect(gameboard.at(6, 0)).not.toBe(ship);
    expect(ship.positions.sort()).toEqual(
      [
        [2, 0],
        [3, 0],
        [4, 0],
      ].sort(),
    );
  });
  test("Hit once", () => {
    expect(gameboard.receiveAttack(2, 0).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([2, 0].join(","));
    expect(ship.hits).toBe(1);
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error", () => {
    expect(() => gameboard.receiveAttack(2, 0)).toThrow("Cell already clicked");
  });
  test("Hit twice", () => {
    expect(gameboard.receiveAttack(3, 0).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([3, 0].join(","));
    expect(gameboard.clickedCells).toContainEqual([2, 0].join(","));
    expect(ship.hits).toBe(2);
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(3, 0)).toThrow("Cell already clicked");
  });
  test("Hit thrice", () => {
    const { state, positions } = gameboard.receiveAttack(4, 0);
    expect(state).toBe(CellState.SHIP_SUNK);
    expect(positions.sort()).toEqual(
      [
        [2, 0],
        [3, 0],
        [4, 0],
      ].sort(),
    );
    expect(gameboard.clickedCells).toContainEqual([4, 0].join(","));
    expect(gameboard.clickedCells).toContainEqual([3, 0].join(","));
    expect(gameboard.clickedCells).toContainEqual([2, 0].join(","));
    expect(ship.hits).toBe(3);
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(4, 0)).toThrow("Cell already clicked");
  });
});

describe("Destroyer tests", () => {
  const gameboard = new Gameboard();
  const ship = gameboard.ships.DESTROYER;
  gameboard.initializeShips();
  test("Initial position", () => {
    expect(gameboard.at(6, 2)).toBe(ship);
    expect(gameboard.at(6, 3)).toBe(ship);
    expect(gameboard.at(6, 4)).toBe(ship);
    expect(gameboard.at(6, 5)).not.toBe(ship);
    expect(gameboard.at(6, 0)).not.toBe(ship);
    expect(ship.positions.sort()).toEqual(
      [
        [6, 2],
        [6, 3],
        [6, 4],
      ].sort(),
    );
  });
  test("Hit once", () => {
    expect(gameboard.receiveAttack(6, 2).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([6, 2].join(","));
    expect(ship.hits).toBe(1);
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error", () => {
    expect(() => gameboard.receiveAttack(6, 2)).toThrow("Cell already clicked");
  });
  test("Hit twice", () => {
    expect(gameboard.receiveAttack(6, 3).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([6, 3].join(","));
    expect(gameboard.clickedCells).toContainEqual([6, 2].join(","));
    expect(ship.hits).toBe(2);
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(6, 3)).toThrow("Cell already clicked");
  });
  test("Hit thrice", () => {
    const { state, positions } = gameboard.receiveAttack(6, 4);
    expect(state).toBe(CellState.SHIP_SUNK);
    expect(positions.sort()).toEqual(
      [
        [6, 4],
        [6, 3],
        [6, 2],
      ].sort(),
    );
    expect(gameboard.clickedCells).toContainEqual([6, 4].join(","));
    expect(gameboard.clickedCells).toContainEqual([6, 3].join(","));
    expect(gameboard.clickedCells).toContainEqual([6, 2].join(","));
    expect(ship.hits).toBe(3);
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(6, 4)).toThrow("Cell already clicked");
  });
});

describe("Battleship tests", () => {
  const gameboard = new Gameboard();
  const ship = gameboard.ships.BATTLESHIP;
  gameboard.initializeShips();
  test("Initial position", () => {
    expect(gameboard.at(3, 8)).toBe(ship);
    expect(gameboard.at(4, 8)).toBe(ship);
    expect(gameboard.at(5, 8)).toBe(ship);
    expect(gameboard.at(6, 8)).toBe(ship);
    expect(gameboard.at(7, 8)).not.toBe(ship);
    expect(ship.positions.sort()).toEqual(
      [
        [3, 8],
        [4, 8],
        [5, 8],
        [6, 8],
      ].sort(),
    );
  });
  test("Hit once", () => {
    expect(gameboard.receiveAttack(3, 8).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([3, 8].join(","));
    expect(ship.hits).toBe(1);
    expect(ship.getRemainingHits()).toBe(3);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error", () => {
    expect(() => gameboard.receiveAttack(3, 8)).toThrow("Cell already clicked");
  });
  test("Hit twice", () => {
    expect(gameboard.receiveAttack(4, 8).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([4, 8].join(","));
    expect(gameboard.clickedCells).toContainEqual([3, 8].join(","));
    expect(ship.hits).toBe(2);
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(4, 8)).toThrow("Cell already clicked");
  });
  test("Hit thrice", () => {
    expect(gameboard.receiveAttack(5, 8).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([5, 8].join(","));
    expect(gameboard.clickedCells).toContainEqual([4, 8].join(","));
    expect(gameboard.clickedCells).toContainEqual([3, 8].join(","));
    expect(ship.hits).toBe(3);
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(5, 8)).toThrow("Cell already clicked");
  });
  test("Hit 4 times", () => {
    const { state, positions } = gameboard.receiveAttack(6, 8);
    expect(state).toBe(CellState.SHIP_SUNK);
    expect(positions.sort()).toEqual(
      [
        [3, 8],
        [4, 8],
        [5, 8],
        [6, 8],
      ].sort(),
    );
    expect(gameboard.clickedCells).toContainEqual([6, 8].join(","));
    expect(gameboard.clickedCells).toContainEqual([5, 8].join(","));
    expect(gameboard.clickedCells).toContainEqual([4, 8].join(","));
    expect(gameboard.clickedCells).toContainEqual([3, 8].join(","));
    expect(ship.hits).toBe(4);
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(6, 8)).toThrow("Cell already clicked");
  });
});

describe("Patrol boat tests", () => {
  const gameboard = new Gameboard();
  gameboard.initializeShips();
  const ship = gameboard.ships.PATROL_BOAT;
  test("Initial position", () => {
    expect(gameboard.at(0, 3)).toBe(ship);
    expect(gameboard.at(0, 4)).toBe(ship);
    expect(gameboard.at(0, 5)).not.toBe(ship);
    expect(gameboard.at(0, 0)).not.toBe(ship);
  });
  test("Hit once", () => {
    expect(gameboard.receiveAttack(0, 3).state).toBe(CellState.HAS_SHIP);
    expect(gameboard.clickedCells).toContainEqual([0, 3].join(","));
    expect(ship.hits).toBe(1);
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error", () => {
    expect(() => gameboard.receiveAttack(0, 3)).toThrow("Cell already clicked");
  });
  test("Hit twice", () => {
    const { state, positions } = gameboard.receiveAttack(0, 4);
    expect(state).toBe(CellState.SHIP_SUNK);
    expect(positions.sort()).toEqual(
      [
        [0, 3],
        [0, 4],
      ].sort(),
    );
    expect(gameboard.clickedCells).toContainEqual([0, 3].join(","));
    expect(gameboard.clickedCells).toContainEqual([0, 4].join(","));
    expect(ship.hits).toBe(2);
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(0, 4)).toThrow("Cell already clicked");
  });
});

test("One gameboard's ship sinks does not affect another gameboard's ships", () => {
  const g1 = new Gameboard();
  g1.initializeShips();
  const g2 = new Gameboard();
  g2.initializeShips();
  g1.receiveAttack(0, 3);
  g1.receiveAttack(0, 4);
  expect(g1.ships.PATROL_BOAT.isSunk()).toBeTruthy();
  expect(g2.ships.PATROL_BOAT.isSunk()).toBeFalsy();
});
