import React, { useEffect, useState } from "react";
import MapRenderer from "./map/MapRenderer";
import { DiamondSquare } from "./utils/diamondSquare";
import { Point } from "./lib/types";

function App() {
  const [points, setPoints] = useState<Array<Point>>([]);
  const [dimension, setDimension] = useState(200);

  useEffect(() => {
    const ds = new DiamondSquare(9);
    setDimension(ds.dimension);
    ds.generate().then((_) => {
      console.log("generated");
      setPoints(ds.toPointArray());
    });
  }, []);
  return (
    <MapRenderer
      width={dimension}
      height={dimension}
      points={points}
      heightColors={[
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
      ]}
    />
  );
}

export default App;
