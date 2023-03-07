import { Point } from "../lib/types";

export class DiamondSquare {
  n: number;
  dimension: number;
  matrix: Array<Array<number>>;
  min: number;
  max: number;
  constructor(n: number) {
    if (n <= 0 || !Number.isInteger(n))
      throw new Error("Only natural positive numbers allowed");
    if (n >= 32) throw new Error("n must be between 1 and 31 included");
    this.n = n;
    this.dimension = 1 + Math.pow(2, n);
    this.matrix = new Array(this.dimension)
      .fill(0)
      .map(() => new Array(this.dimension));
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
  }

  generate(): Array<Array<number>> {
    const matrix = this.initMatrix();
    const randomFactor = Math.round(Math.random() * 5);
    let size = this.dimension - 1;

    while (size > 1) {
      const middle = size / 2;
      for (let i = middle; i < this.dimension - 1; i += size) {
        for (let j = middle; j < this.dimension - 1; j += size) {
          matrix[i][j] =
            this.diamondStep(i, j, middle) + this.generateRandom(randomFactor);

          //left
          matrix[i][j - middle] =
            this.squareStep(i, j - middle, middle) +
            this.generateRandom(randomFactor);
          // top
          matrix[i - middle][j] =
            this.squareStep(i - middle, j, middle) +
            this.generateRandom(randomFactor);
          // bottom
          matrix[i + middle][j] =
            this.squareStep(i + middle, j, middle) +
            this.generateRandom(randomFactor);
          // right
          matrix[i][j + middle] =
            this.squareStep(i, j + middle, middle) +
            this.generateRandom(randomFactor);
        }
      }
      size /= 2;
    }

    return matrix;
  }

  getMinMax() {
    for (let x = 0; x < this.dimension; ++x) {
      for (let y = 0; y < this.dimension; ++y) {
        const current = this.matrix[x][y];
        if (current > this.max) this.max = current;
        if (current < this.min) this.min = current;
      }
    }
  }

  normalize() {
    this.getMinMax();
    const divider = this.max - this.min;
    for (let x = 0; x < this.dimension; ++x) {
      for (let y = 0; y < this.dimension; ++y) {
        const normalized = (this.matrix[x][y] - this.min) / divider;
        this.matrix[x][y] = normalized;
      }
    }
    return this.matrix;
  }

  toPointArray(): Array<Point> {
    this.normalize();
    const array = new Array<Point>();
    for (let x = 0; x < this.dimension; ++x) {
      for (let y = 0; y < this.dimension; ++y) {
        array.push({ x, y, height: this.matrix[x][y] });
      }
    }
    return array;
  }

  initMatrix(): Array<Array<number>> {
    this.matrix[0][0] = Math.floor(Math.random() * 10);
    const last = this.dimension - 1;
    this.matrix[0][last] = Math.floor(Math.random() * 10);
    this.matrix[last][0] = Math.floor(Math.random() * 10);
    this.matrix[last][last] = Math.floor(Math.random() * 10);
    return this.matrix;
  }

  diamondStep(x: number, y: number, middle: number) {
    const safeMatrixMember = (x1: number, y1: number) => {
      if (
        this.matrix[x1] === undefined ||
        this.matrix[x1][y1] === undefined ||
        Number.isNaN(this.matrix[x1][y1])
      ) {
        meanMembers -= 1;
        return 0;
      }

      return this.matrix[x1][y1];
    };

    let meanMembers = 4;

    meanMembers = 4;

    const result =
      (safeMatrixMember(x + middle, y - middle) +
        safeMatrixMember(x + middle, y + middle) +
        safeMatrixMember(x - middle, y - middle) +
        safeMatrixMember(x - middle, y + middle)) /
      meanMembers;
    return Number.isNaN(result) ? 0 : result;
  }

  squareStep(x: number, y: number, middle: number) {
    const safeMatrixMember = (x1: number, y1: number) => {
      if (
        this.matrix[x1] === undefined ||
        this.matrix[x1][y1] === undefined ||
        Number.isNaN(this.matrix[x1][y1])
      ) {
        meanMembers -= 1;
        return 0;
      }

      return this.matrix[x][y];
    };

    let meanMembers = 4;
    const result =
      (safeMatrixMember(x - middle, y) +
        safeMatrixMember(x + middle, y) +
        safeMatrixMember(x, y - middle) +
        safeMatrixMember(x, y + middle)) /
      meanMembers;
    return Number.isNaN(result) ? 0 : result;
  }
  generateRandom(random: number) {
    const h = Math.random() * -0.1;
    return random * Math.pow(2, h);
  }
}
