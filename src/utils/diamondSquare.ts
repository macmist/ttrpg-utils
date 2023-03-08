import { Point } from "../lib/types";

export class DiamondSquare {
  n: number;
  dimension: number;
  matrix: Array<Array<number>>;
  min: number;
  max: number;
  computed: boolean;
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
    this.computed = false;
  }

  generate(): Promise<Array<Array<number>>> {
    const matrix = this.initMatrix();
    const randomFactor = Math.round(Math.random() * 5);
    let size = this.dimension - 1;
    return new Promise<Array<Array<number>>>((resolve) => {
      while (size > 1) {
        this.diamondStep(size, randomFactor);
        this.squareStep(size, randomFactor);
        size /= 2;
      }
      this.computed = true;
      return resolve(matrix);
    });
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

  getAverage(x: number, y: number, middle: number) {
    const topLeft = this.matrix[x - middle][y - middle];
    const topRight = this.matrix[x + middle][y - middle];
    const bottomLeft = this.matrix[x - middle][y + middle];
    const bottomRight = this.matrix[x + middle][y + middle];
    return Math.floor((topLeft + topRight + bottomRight + bottomLeft) / 4);
  }

  diamondStep(step: number, randomFactor: number) {
    const half = step / 2;
    for (let x = half; x < this.dimension; x += step) {
      for (let y = half; y < this.dimension; y += step) {
        const average = this.getAverage(x, y, half);
        this.matrix[x][y] = average + this.generateRandom(-half, half);
      }
    }
  }

  squareStep(step: number, randomFactor: number) {
    const half = step / 2;
    let offset = 0;
    for (let x = 0; x < this.dimension; x += half) {
      if (offset === 0) offset = half;
      else offset = 0;
      for (let y = offset; y < this.dimension; y += step) {
        let total = 0;
        let vertices = 0;
        if (x >= half) {
          total += this.matrix[x - half][y];
          vertices += 1;
        }
        if (x + half < this.dimension) {
          total += this.matrix[x + half][y];
          vertices += 1;
        }
        if (y >= half) {
          total += this.matrix[x][y - half];
          vertices += 1;
        }
        if (y + half < this.dimension) {
          total += this.matrix[x][y + half];
          vertices += 1;
        }
        this.matrix[x][y] = total / vertices + this.generateRandom(-half, half);
      }
    }
  }
  generateRandom(a: number, b: number) {
    return Math.floor(Math.random() * (b + 1 - a) + a);
  }
}
