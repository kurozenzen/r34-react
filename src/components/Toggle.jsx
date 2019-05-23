import React from 'react';
import Toggle from 'react-toggle'

export default function (props) {
  return (
    <label className="toggle-wrapper">
    <Toggle
      defaultChecked={props.initial}
      icons={{
        checked: null,
        unchecked: null,
      }}
      onChange={props.onChange} />
    <span className="toggle-text">{props.text}</span>
  </label>
  )
}