import { Modal } from "react-bootstrap";
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
      <Modal show={visible} onHide={() => onChange(currentColor)}>
        <Modal.Body>
          <HexColorPicker color={color} onChange={setCurrentColor} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ColorPickerModal;
