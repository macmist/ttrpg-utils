import { RangeColor } from "./MapRenderer";
import { useState } from "react";

interface MapRangeHeightCreatorProps {
  heightColors?: Array<RangeColor>;
  onSave?: (heightColors: Array<RangeColor>) => void;
}
const MapRangeHeightCreator = (props: MapRangeHeightCreatorProps) => {
  const { heightColors, onSave } = props;
  const [ranges, setRanges] = useState<Array<RangeColor>>(heightColors || []);
  const onAddRange = () => {
    setRanges([...ranges, { low: 0, high: 1, color: "#ffffff" }]);
  };
  const onClickSave = () => {
    if (onSave) onSave(ranges);
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
      {ranges &&
        ranges.map((range, index) => {
          return (
            <div key={index}>
              <input
                type={"number"}
                value={range.low * 100}
                onChange={(e) => onUpdateRange(index, "low", e.target.value)}
              />
              <input
                value={range.high * 100}
                onChange={(e) => onUpdateRange(index, "high", e.target.value)}
              />
              <input
                value={range.color}
                onChange={(e) => onUpdateRange(index, "color", e.target.value)}
              />
            </div>
          );
        })}
      <button onClick={onAddRange}>Add Range</button>
      <button onClick={onClickSave}>Save</button>
    </div>
  );
};

export default MapRangeHeightCreator;
