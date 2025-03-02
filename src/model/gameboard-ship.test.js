import { Gameboard } from "./gameboard";
import { ships } from "./ship";

describe("Carrier tests", () => {
  const gameboard = new Gameboard();
  const ship = gameboard.ships.CARRIER;
  gameboard.initializeShips();
  test("Initial position", () => {
    expect(gameboard.at(8, 1)).toBe(ships.CARRIER);
    expect(gameboard.at(8, 2)).toBe(ships.CARRIER);
    expect(gameboard.at(8, 3)).toBe(ships.CARRIER);
    expect(gameboard.at(8, 4)).toBe(ships.CARRIER);
    expect(gameboard.at(8, 5)).toBe(ships.CARRIER);
    expect(gameboard.at(8, 6)).not.toBe(ships.CARRIER);
  });
  test("Hit once", () => {
    gameboard.receiveAttack(8, 1);
    expect(gameboard.clickedCells).toContainEqual([8, 1].toString());
    expect(ship.hits).toBe(1);
    expect(ship.getRemainingHits()).toBe(4);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error", () => {
    expect(() => gameboard.receiveAttack(8, 1)).toThrow("Cell already clicked");
  });
  test("Hit twice", () => {
    gameboard.receiveAttack(8, 2);
    expect(gameboard.clickedCells).toContainEqual([8, 1].toString());
    expect(gameboard.clickedCells).toContainEqual([8, 2].toString());
    expect(ship.hits).toBe(2);
    expect(ship.getRemainingHits()).toBe(3);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(8, 2)).toThrow("Cell already clicked");
  });
  test("Hit thrice", () => {
    gameboard.receiveAttack(8, 3);
    expect(gameboard.clickedCells).toContainEqual([8, 1].toString());
    expect(gameboard.clickedCells).toContainEqual([8, 2].toString());
    expect(gameboard.clickedCells).toContainEqual([8, 3].toString());
    expect(ship.hits).toBe(3);
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(8, 3)).toThrow("Cell already clicked");
  });
  test("Hit 4 times", () => {
    gameboard.receiveAttack(8, 4);
    expect(gameboard.clickedCells).toContainEqual([8, 4].toString());
    expect(gameboard.clickedCells).toContainEqual([8, 3].toString());
    expect(gameboard.clickedCells).toContainEqual([8, 2].toString());
    expect(gameboard.clickedCells).toContainEqual([8, 1].toString());
    expect(ship.hits).toBe(4);
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(8, 4)).toThrow("Cell already clicked");
  });
  test("Hit 5 times", () => {
    gameboard.receiveAttack(8, 5);
    expect(gameboard.clickedCells).toContainEqual([8, 5].toString());
    expect(gameboard.clickedCells).toContainEqual([8, 4].toString());
    expect(gameboard.clickedCells).toContainEqual([8, 3].toString());
    expect(gameboard.clickedCells).toContainEqual([8, 2].toString());
    expect(gameboard.clickedCells).toContainEqual([8, 1].toString());
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
    expect(gameboard.at(2, 0)).toBe(ships.SUBMARINE);
    expect(gameboard.at(3, 0)).toBe(ships.SUBMARINE);
    expect(gameboard.at(4, 0)).toBe(ships.SUBMARINE);
    expect(gameboard.at(5, 0)).not.toBe(ships.SUBMARINE);
    expect(gameboard.at(6, 0)).not.toBe(ships.SUBMARINE);
  });
  test("Hit once", () => {
    gameboard.receiveAttack(2, 0);
    expect(gameboard.clickedCells).toContainEqual([2, 0].toString());
    expect(ship.hits).toBe(1);
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error", () => {
    expect(() => gameboard.receiveAttack(2, 0)).toThrow("Cell already clicked");
  });
  test("Hit twice", () => {
    gameboard.receiveAttack(3, 0);
    expect(gameboard.clickedCells).toContainEqual([3, 0].toString());
    expect(gameboard.clickedCells).toContainEqual([2, 0].toString());
    expect(ship.hits).toBe(2);
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(3, 0)).toThrow("Cell already clicked");
  });
  test("Hit thrice", () => {
    gameboard.receiveAttack(4, 0);
    expect(gameboard.clickedCells).toContainEqual([4, 0].toString());
    expect(gameboard.clickedCells).toContainEqual([3, 0].toString());
    expect(gameboard.clickedCells).toContainEqual([2, 0].toString());
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
    expect(gameboard.at(6, 2)).toBe(ships.DESTROYER);
    expect(gameboard.at(6, 3)).toBe(ships.DESTROYER);
    expect(gameboard.at(6, 4)).toBe(ships.DESTROYER);
    expect(gameboard.at(6, 5)).not.toBe(ships.DESTROYER);
    expect(gameboard.at(6, 0)).not.toBe(ships.DESTROYER);
  });
  test("Hit once", () => {
    gameboard.receiveAttack(6, 2);
    expect(gameboard.clickedCells).toContainEqual([6, 2].toString());
    expect(ship.hits).toBe(1);
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error", () => {
    expect(() => gameboard.receiveAttack(6, 2)).toThrow("Cell already clicked");
  });
  test("Hit twice", () => {
    gameboard.receiveAttack(6, 3);
    expect(gameboard.clickedCells).toContainEqual([6, 3].toString());
    expect(gameboard.clickedCells).toContainEqual([6, 2].toString());
    expect(ship.hits).toBe(2);
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(6, 3)).toThrow("Cell already clicked");
  });
  test("Hit thrice", () => {
    gameboard.receiveAttack(6, 4);
    expect(gameboard.clickedCells).toContainEqual([6, 4].toString());
    expect(gameboard.clickedCells).toContainEqual([6, 3].toString());
    expect(gameboard.clickedCells).toContainEqual([6, 2].toString());
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
    expect(gameboard.at(3, 8)).toBe(ships.BATTLESHIP);
    expect(gameboard.at(4, 8)).toBe(ships.BATTLESHIP);
    expect(gameboard.at(5, 8)).toBe(ships.BATTLESHIP);
    expect(gameboard.at(6, 8)).toBe(ships.BATTLESHIP);
    expect(gameboard.at(7, 8)).not.toBe(ships.BATTLESHIP);
  });
  test("Hit once", () => {
    gameboard.receiveAttack(3, 8);
    expect(gameboard.clickedCells).toContainEqual([3, 8].toString());
    expect(ship.hits).toBe(1);
    expect(ship.getRemainingHits()).toBe(3);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error", () => {
    expect(() => gameboard.receiveAttack(3, 8)).toThrow("Cell already clicked");
  });
  test("Hit twice", () => {
    gameboard.receiveAttack(4, 8);
    expect(gameboard.clickedCells).toContainEqual([4, 8].toString());
    expect(gameboard.clickedCells).toContainEqual([3, 8].toString());
    expect(ship.hits).toBe(2);
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(4, 8)).toThrow("Cell already clicked");
  });
  test("Hit thrice", () => {
    gameboard.receiveAttack(5, 8);
    expect(gameboard.clickedCells).toContainEqual([5, 8].toString());
    expect(gameboard.clickedCells).toContainEqual([4, 8].toString());
    expect(gameboard.clickedCells).toContainEqual([3, 8].toString());
    expect(ship.hits).toBe(3);
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(5, 8)).toThrow("Cell already clicked");
  });
  test("Hit 4 times", () => {
    gameboard.receiveAttack(6, 8);
    expect(gameboard.clickedCells).toContainEqual([6, 8].toString());
    expect(gameboard.clickedCells).toContainEqual([5, 8].toString());
    expect(gameboard.clickedCells).toContainEqual([4, 8].toString());
    expect(gameboard.clickedCells).toContainEqual([3, 8].toString());
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
    expect(gameboard.at(0, 3)).toBe(ships.PATROL_BOAT);
    expect(gameboard.at(0, 4)).toBe(ships.PATROL_BOAT);
    expect(gameboard.at(0, 5)).not.toBe(ships.PATROL_BOAT);
    expect(gameboard.at(0, 0)).not.toBe(ships.PATROL_BOAT);
  });
  test("Hit once", () => {
    gameboard.receiveAttack(0, 3);
    expect(gameboard.clickedCells).toContainEqual([0, 3].toString());
    expect(ship.hits).toBe(1);
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit same cell throws error", () => {
    expect(() => gameboard.receiveAttack(0, 3)).toThrow("Cell already clicked");
  });
  test("Hit twice", () => {
    gameboard.receiveAttack(0, 4);
    expect(gameboard.clickedCells).toContainEqual([0, 3].toString());
    expect(gameboard.clickedCells).toContainEqual([0, 4].toString());
    expect(ship.hits).toBe(2);
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("Hit same cell throws error 2", () => {
    expect(() => gameboard.receiveAttack(0, 4)).toThrow("Cell already clicked");
  });
});
