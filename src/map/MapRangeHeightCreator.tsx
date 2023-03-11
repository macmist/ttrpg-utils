import { RangeColor } from "./MapRenderer";
import { useState } from "react";
import { Col, FloatingLabel, Form, Row, Table } from "react-bootstrap";
import ColorPickerModal from "./ColorPickerModal";
import "./map.css";

interface MapRangeHeightCreatorProps {
  heightColors?: Array<RangeColor>;
  onSave?: (heightColors: Array<RangeColor>) => void;
}
const MapRangeHeightCreator = (props: MapRangeHeightCreatorProps) => {
  const { heightColors, onSave } = props;
  const [ranges, setRanges] = useState<Array<RangeColor>>(heightColors || []);
  const [modalsVisibility, setModalsVisibility] = useState<Array<boolean>>(
    heightColors ? heightColors.map((x) => false) : []
  );
  const onAddRange = () => {
    setModalsVisibility([...modalsVisibility, false]);
    setRanges([...ranges, { low: 0, high: 1, color: "#ffffff" }]);
  };
  const onClickSave = () => {
    if (onSave) onSave(ranges);
  };
  const updateModalVisibility = (index: number, visible: boolean) => {
    setModalsVisibility(
      modalsVisibility.map((x, idx) => {
        if (idx === index) return visible;
        return x;
      })
    );
  };
  const onUpdateRange = (index: number, key: string, value: string) => {
    const range = ranges[index];
    if (key !== "color" && key !== "low" && key !== "high") return;
    if (key === "color") range[key] = value;
    else range[key] = Number.parseInt(value) / 100;
    const newRanges = ranges.map((x, idx) => {
      if (idx === index) return range;
      return x;
    });
    setRanges(newRanges);
  };
  return (
    <div className="mapHeightContainer">
      <Table size="sm">
        <thead>
          <tr>
            <th>Low</th>
            <th>High</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {ranges &&
            ranges.map((range, index) => {
              return (
                <tr key={index}>
                  <td>
                    <FloatingLabel label={"low"}>
                      <Form.Control
                        type="number"
                        value={range.low * 100}
                        onChange={(event) =>
                          onUpdateRange(index, "low", event.target.value)
                        }
                      ></Form.Control>
                    </FloatingLabel>
                  </td>
                  <td>
                    <FloatingLabel label={"high"}>
                      <Form.Control
                        type="number"
                        value={range.high * 100}
                        onChange={(event) =>
                          onUpdateRange(index, "high", event.target.value)
                        }
                      ></Form.Control>
                    </FloatingLabel>
                  </td>
                  <td>
                    <Row
                      onClick={() => {
                        updateModalVisibility(index, true);
                      }}
                      className="justify-content-center align-items-center"
                    >
                      <Col sm={1}>
                        <div
                          style={{
                            backgroundColor: range.color,
                            width: "20px",
                            height: "20px",
                          }}
                        ></div>
                      </Col>

                      <Col>
                        <FloatingLabel label={"color"}>
                          <Form.Control
                            type="text"
                            value={range.color}
                            disabled
                            style={{ display: "inline-block" }}
                          ></Form.Control>
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <ColorPickerModal
                      color={range.color}
                      onChange={(color) => {
                        onUpdateRange(index, "color", color);
                        updateModalVisibility(index, false);
                      }}
                      visible={modalsVisibility[index]}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <button onClick={onAddRange}>Add Range</button>
      <button onClick={onClickSave}>Save</button>
    </div>
  );
};

export default MapRangeHeightCreator;
