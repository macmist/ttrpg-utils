import React, { useEffect, useState } from "react";
import MapRenderer, { RangeColor } from "./map/MapRenderer";
import { DiamondSquare } from "./utils/diamondSquare";
import { Point } from "./lib/types";
import MapSizeSelector from "./map/MapSizeSelector";
import MapRangeHeightCreator from "./map/MapRangeHeightCreator";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const [points, setPoints] = useState<Array<Point>>([]);
  const [dimension, setDimension] = useState(200);
  const [generating, setGenerating] = useState<boolean>(true);
  const [heights, setHeights] = useState<Array<RangeColor>>([
    { low: 0, high: 0.1, color: "#05308d" },
    { low: 0.1, high: 0.2, color: "#153e97" },

    { low: 0.2, high: 0.3, color: "#0016ff" },
    { low: 0.3, high: 0.4, color: "#FFF8DC" },
    { low: 0.4, high: 0.5, color: "#DEB887" },
    { low: 0.5, high: 0.8, color: "#0d980d" },
    { low: 0.8, high: 0.9, color: "#8B4513" },
    { low: 0.9, high: 1, color: "#ffffff" },
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

  const download = () => {
    const canvas = document.getElementsByTagName("canvas")[0];
    const ctx = canvas?.getContext("2d");

    if (ctx && canvas) {
      let canvasUrl = canvas.toDataURL();
      const createEl = document.createElement("a");
      createEl.href = canvasUrl;
      createEl.download = "map";
      createEl.click();
      createEl.remove();
    }
  };

  return (
    <Container>
      <MapSizeSelector
        onRegenerate={(n) => regenerate(n)}
        onDownload={download}
      />

      <Row className="justify-content-md-center">
        <Col xs={7} style={{ overflow: "auto" }}>
          <MapRenderer
            width={dimension}
            height={dimension}
            points={points}
            heightColors={heights}
          />
        </Col>
        <Col xs={5}>
          <MapRangeHeightCreator
            heightColors={heights}
            onSave={(ranges) => setHeights(ranges)}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
