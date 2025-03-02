import { ships, ShipType } from "./ship";

describe("Carrier tests", () => {
  const ship = ships.CARRIER;
  test("Initialize", () => {
    expect(ship.getSize()).toBe(5);
    expect(ship.type).toBe(ShipType.CARRIER[0]);
  });
  test("Hit once", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(4);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit twice", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(3);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit thrice", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit 4 times", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit 5 times", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("Hit 6 times", () => {
    expect(() => ship.hit()).toThrow("Ship already sunk");
  });
  test("Hit 7 times", () => {
    expect(() => ship.hit()).toThrow("Ship already sunk");
  });
});

describe("Battleship tests", () => {
  const ship = ships.BATTLESHIP;
  test("Initialize", () => {
    expect(ship.getSize()).toBe(4);
    expect(ship.type).toBe(ShipType.BATTLESHIP[0]);
  });
  test("Hit once", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(3);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit twice", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit thrice", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit 4 times", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("Hit 5 times", () => {
    expect(() => ship.hit()).toThrow("Ship already sunk");
  });
  test("Hit 6 times", () => {
    expect(() => ship.hit()).toThrow("Ship already sunk");
  });
});

describe("Submarine tests", () => {
  const ship = ships.SUBMARINE;
  test("Initialize", () => {
    expect(ship.getSize()).toBe(3);
    expect(ship.type).toBe(ShipType.SUBMARINE[0]);
  });
  test("Hit once", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit twice", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit thrice", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("Hit 4 times", () => {
    expect(() => ship.hit()).toThrow("Ship already sunk");
  });
  test("Hit 5 times", () => {
    expect(() => ship.hit()).toThrow("Ship already sunk");
  });
});

describe("Patrol boat tests", () => {
  const ship = ships.PATROL_BOAT;
  test("Initialize", () => {
    expect(ship.getSize()).toBe(2);
    expect(ship.type).toBe(ShipType.PATROL_BOAT[0]);
  });
  test("Hit once", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("Hit twice", () => {
    ship.hit();
    expect(ship.getRemainingHits()).toBe(0);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("Hit thrice", () => {
    expect(() => ship.hit()).toThrow("Ship already sunk");
  });
  test("Hit 4 times", () => {
    expect(() => ship.hit()).toThrow("Ship already sunk");
  });
});
