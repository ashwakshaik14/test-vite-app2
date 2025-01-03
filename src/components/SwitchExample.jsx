import { useState } from "react";
import Switch from "react-switch";

const SwitchExample = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "10px" }}>Switch with default style:</span>
      <Switch onChange={handleChange} checked={checked} />
    </div>
  );
};

export default SwitchExample;
