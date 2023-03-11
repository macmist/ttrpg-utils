import { useState } from "react";
import "./map.css";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

interface MapSizeSelectorProps {
  onRegenerate?: (n: number) => void;
  onDownload?: () => void;
}
const range = (from: number, to: number, step: number) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

const MapSizeSelector = (props: MapSizeSelectorProps) => {
  const { onRegenerate, onDownload } = props;
  const [value, setValue] = useState<number>(9);
  const handleClick = () => {
    if (onRegenerate) onRegenerate(value);
  };

  const download = () => {
    if (onDownload) onDownload();
  };

  return (
    <Row className="mapSizeSelector mb-3">
      <Col sm={4}>
        <InputGroup>
          <Form.Select
            onChange={(e) => setValue(Number.parseInt(e.target.value))}
            defaultValue={value}
          >
            {range(5, 12, 1).map((x) => {
              const size = Math.pow(2, x) + 1;
              return (
                <option value={x} key={x}>
                  {size}px * {size}px
                </option>
              );
            })}
          </Form.Select>
          <Button onClick={handleClick}>Re-generate</Button>
        </InputGroup>
      </Col>
      <Col sm={{ span: 1, offset: 7 }}>
        <Button variant="success" onClick={download}>
          Download
        </Button>
      </Col>
    </Row>
  );
};

export default MapSizeSelector;
