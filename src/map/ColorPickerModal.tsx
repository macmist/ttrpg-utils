import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerModalProps {
  color: string;
  onChange: (color: string) => void;
  visible: boolean;
}
const ColorPickerModal = (props: ColorPickerModalProps) => {
  const { color, onChange, visible } = props;
  const [currentColor, setCurrentColor] = useState<string>(color);
  return (
    <>
      <Modal
        show={visible}
        onHide={() => onChange(currentColor)}
        dialogClassName="colorPickerModal"
      >
        <Modal.Body style={{ width: "300px", alignSelf: "baseline" }}>
          <HexColorPicker
            className={"mb-3"}
            color={color}
            onChange={setCurrentColor}
          />
          <Button onClick={() => onChange(currentColor)}>Close</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ColorPickerModal;
