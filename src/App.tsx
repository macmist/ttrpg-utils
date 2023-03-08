import React, { useEffect, useState } from "react";
import MapRenderer, { RangeColor } from "./map/MapRenderer";
import { DiamondSquare } from "./utils/diamondSquare";
import { Point } from "./lib/types";
import MapSizeSelector from "./map/MapSizeSelector";
import Spinner from "react-bootstrap/Spinner";
import MapRangeHeightCreator from "./map/MapRangeHeightCreator";

function App() {
  const [points, setPoints] = useState<Array<Point>>([]);
  const [dimension, setDimension] = useState(200);
  const [generating, setGenerating] = useState<boolean>(true);
  const [heights, setHeights] = useState<Array<RangeColor>>([
    { low: 0, high: 0.1, color: "#5C6F68" },
    { low: 0.1, high: 0.2, color: "#BD2D87" },
    { low: 0.2, high: 0.3, color: "#23FADE" },
    { low: 0.3, high: 0.4, color: "#23FADE" },
    { low: 0.4, high: 0.5, color: "#FABEAD" },
    { low: 0.5, high: 0.6, color: "#B2C3D4" },
    { low: 0.6, high: 0.7, color: "#ffda43" },
    { low: 0.7, high: 0.8, color: "#aaee22" },
    { low: 0.8, high: 0.9, color: "#64effe" },
    { low: 0.9, high: 1, color: "#bbaa66" },
  ]);

  useEffect(() => {
    regenerate(9);
  }, []);

  const regenerate = (n: number) => {
    const ds = new DiamondSquare(n);
    setDimension(ds.dimension);
    setGenerating(true);
    ds.generate().then((_) => {
      setPoints(ds.toPointArray());
      setGenerating(false);
    });
  };

  return (
    <>
      <MapSizeSelector onRegenerate={(n) => regenerate(n)} />
      <MapRangeHeightCreator
        heightColors={heights}
        onSave={(ranges) => setHeights(ranges)}
      />
      {generating && <Spinner />}
      <MapRenderer
        width={dimension}
        height={dimension}
        points={points}
        heightColors={heights}
      />
    </>
  );
}

export default App;
