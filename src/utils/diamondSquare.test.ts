import { DiamondSquare } from "./diamondSquare";
import { isNumberObject } from "util/types";
it("should fail with null, negative, or decimal number", () => {
  expect(() => new DiamondSquare(0)).toThrow(
    "Only natural positive numbers allowed"
  );
  expect(() => new DiamondSquare(12.2)).toThrow(
    "Only natural positive numbers allowed"
  );
  expect(() => new DiamondSquare(-12)).toThrow(
    "Only natural positive numbers allowed"
  );
});

it("cannot be an integer bigger than 31", () => {
  expect(() => new DiamondSquare(32)).toThrow(
    "n must be between 1 and 31 included"
  );
});

it("should accept positive natural integer", () => {
  expect(() => new DiamondSquare(1)).not.toThrow();
  expect(() => new DiamondSquare(5)).not.toThrow();
  expect(() => new DiamondSquare(9)).not.toThrow();
});

it("should return an empty matrix of size 2 ^ n + 1", () => {
  const ns: Array<number> = [3, 5, 9];
  ns.forEach((n) => {
    const matrix = new DiamondSquare(n).initMatrix();
    const size = 1 + Math.pow(2, n);
    expect(matrix.length).toEqual(size);
    expect(matrix.every((row) => row.length === size)).toBe(true);
    const ds = new DiamondSquare(n);
  });
});

it("should generate random number between values", () => {
  const ranges = [
    [-1, 2],
    [12, 53],
    [100, 2000],
  ];
  const ds = new DiamondSquare(12);
  ranges.forEach((range) => {
    const r = ds.generateRandom(range[0], range[1]);
    expect(r).toBeGreaterThanOrEqual(range[0]);
    expect(r).toBeLessThanOrEqual(range[1]);
  });
});
