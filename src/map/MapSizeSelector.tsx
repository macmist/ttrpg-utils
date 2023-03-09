import { useState } from "react";

interface MapSizeSelectorProps {
  onRegenerate?: (n: number) => void;
}
const range = (from: number, to: number, step: number) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

const MapSizeSelector = (props: MapSizeSelectorProps) => {
  const { onRegenerate } = props;
  const [value, setValue] = useState<number>(1);
  const handleClick = () => {
    if (onRegenerate) onRegenerate(value);
  };

  return (
    <>
      <select
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
      </select>
      <button onClick={handleClick}>Re-generate</button>
    </>
  );
};

export default MapSizeSelector;
