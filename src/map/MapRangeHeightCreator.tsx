import { RangeColor } from "./MapRenderer";
import { useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  OverlayTrigger,
  Popover,
  Row,
  Table,
} from "react-bootstrap";
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

  const help = (
    <Popover id="height-help">
      <Popover.Header as="h3">Color ranges</Popover.Header>
      <Popover.Body>
        Each pixel on the map has a height between 0 and 100. Use the table
        below to assign a color to a specific range of height. For instance, the
        first row assigns a dark blue color to all points with a height between
        0 and 10.
        <br />
        You can edit each range however you want.
        <br />
        Click the "Add Row" button to add a new row.
        <br />
        Click the "Save" button once done to update the map.
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="mapHeightContainer">
      <Row className="align-items-center">
        <Col>
          <h1>Color ranges</h1>
        </Col>
        <Col>
          <OverlayTrigger trigger="click" placement={"auto"} overlay={help}>
            <Button variant="outline-info">Help</Button>
          </OverlayTrigger>
        </Col>
      </Row>

      <Table size="sm">
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

      <Button className={"me-3"} variant="outline-primary" onClick={onAddRange}>
        Add Range
      </Button>
      <Button onClick={onClickSave}>Save</Button>
    </div>
  );
};

export default MapRangeHeightCreator;
