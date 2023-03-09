import { RangeColor } from "./MapRenderer";
import { useState } from "react";
import { Table } from "react-bootstrap";
import ColorPickerModal from "./ColorPickerModal";

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
    <div>
      <Table>
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
              // setModalsVisibility([...modalsVisibility, false]);
              return (
                <tr key={index}>
                  <td>
                    <input
                      type={"number"}
                      value={range.low * 100}
                      onChange={(e) =>
                        onUpdateRange(index, "low", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={range.high * 100}
                      onChange={(e) =>
                        onUpdateRange(index, "high", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <div
                      onClick={() => {
                        updateModalVisibility(index, true);
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: range.color,
                          display: "inline-block",
                        }}
                        disabled
                      >
                        {" "}
                      </button>

                      <input
                        style={{ display: "inline-block" }}
                        value={range.color}
                        disabled
                      />
                    </div>
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
