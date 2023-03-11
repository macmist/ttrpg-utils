import React, { useCallback, useEffect, useRef } from "react";
import { Point } from "../lib/types";
import "./map.css";

export interface RangeColor {
  low: number;
  high: number;
  color: string;
}

interface MapRendererProps {
  width?: number;
  height?: number;
  points?: Array<Point>;
  heightColors?: Array<RangeColor>;
}

const MapRenderer = (props: MapRendererProps) => {
  const { width, height, points, heightColors } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toHex = (r: number, g: number, b: number) => {
    return (
      "#" +
      ("0" + r.toString(16)).slice(-2) +
      ("0" + b.toString(16)).slice(-2) +
      ("0" + g.toString(16)).slice(-2)
    );
  };

  const findHeightColor = useCallback(
    (height: number) => {
      const gray = (height * 100 * 255) / 100;
      const defaultColor = toHex(gray, gray, gray);
      if (!heightColors) {
        return defaultColor;
      }
      for (const range of heightColors)
        if (height >= range.low && height <= range.high) return range.color;

      return defaultColor;
    },
    [heightColors]
  );

  const drawPixel = useCallback(
    (context: CanvasRenderingContext2D, p: Point) => {
      context.fillStyle = findHeightColor(p.height);
      context.fillRect(p.x, p.y, 1, 1);
    },
    [findHeightColor]
  );

  useEffect(() => {}, [heightColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (points) {
        points.forEach((point) => {
          drawPixel(ctx, point);
        });
      }
    }
  }, [points, heightColors, drawPixel]);

  return (
    <div className="mapContainer">
      <canvas
        id={"mapCanvas"}
        ref={canvasRef}
        width={width || 200}
        height={height || 200}
      ></canvas>
    </div>
  );
};

export default MapRenderer;
