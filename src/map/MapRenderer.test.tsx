import MapRenderer from "./MapRenderer";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Point } from "../lib/types";

const toHex = (r: number, g: number, b: number, a: number) => {
  return (
    "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2)
  );
};

it("should render a canvas", () => {
  const { container } = render(<MapRenderer />);
  const canvas = container.querySelector("canvas");
  expect(canvas).toBeInTheDocument();
});

it("should correctly set dimensions", () => {
  const width = 500;
  const height = 500;
  const { container } = render(<MapRenderer width={width} height={height} />);
  const canvas = container.querySelector("canvas");
  expect(canvas).toBeInTheDocument();
  expect(canvas?.width).toEqual(width);
  expect(canvas?.height).toEqual(height);
});

// it ('should correctly render a point', () => {
//     const width = 500;
//     const height = 500;
//     const point: Point = {x: 250, y: 250, height: 1}
//     const {container} = render(<MapRenderer width={width} height={height} points={[point]} />)
//     const canvas = container.querySelector('canvas')
//     if (canvas) {
//         const ctx = canvas.getContext("2d")
//         expect(ctx).not.toBeNull()
//         const data = ctx?.getImageData(point.x, point.y, 1, 1).data
//         expect(data).not.toBeNull()
//         if (data) expect(toHex(data[0], data[1], data[2], data[3])).toEqual(point.color)
//     }
// })
