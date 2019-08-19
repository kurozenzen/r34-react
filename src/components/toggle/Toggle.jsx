import React from "react";
import { bool, func, string } from "prop-types";
import ReactToggle from "react-toggle";
import "./Toggle.css";

function Toggle({ text, initial, onChange }) {
  return (
    <label className="toggle-wrapper">
      <ReactToggle
        defaultChecked={initial || false}
        icons={{
          checked: null,
          unchecked: null
        }}
        onChange={onChange}
      />
      <span className="toggle-text">{text}</span>
    </label>
  );
}

Toggle.propTypes = {
  text: string.isRequired,
  initial: bool,
  onChange: func.isRequired
};

export default Toggle;
