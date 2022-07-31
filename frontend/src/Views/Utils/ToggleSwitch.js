import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch(props) {
  const onToggle = () => props.setIsToggled(!props.isToggled);
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={props.isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}
export default ToggleSwitch;