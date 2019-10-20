import React, { useState } from "react";
import { shape, bool, number, func } from "prop-types";
import styled from "styled-components";
import Toggle from "../common/Toggle";

const StyledInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: red;
  margin-left: 5px;
  margin-right: 5px;
  width: ${({ value }) => 0.57 * String(value).length}em;
  text-align: right;
`;

export default function Options({ options, dispatch }) {
  const [localRated, setLocalRated] = useState(1);

  return (
    <div>
      <Toggle
        initial={options.infinite}
        onChange={() =>
          dispatch({
            type: "SET_OPTION",
            key: "infinite",
            value: !options.infinite
          })
        }
      >
        Infinite Scrolling
      </Toggle>
      <Toggle
        initial={Boolean(options.rated)}
        onChange={() => {
          dispatch({
            type: "SET_OPTION",
            key: "rated",
            value: options.rated ? undefined : localRated
          });
        }}
      >
        {options.rated ? (
          <div style={{ display: "flex" }}>
            Above
            <StyledInput
              type="text"
              value={localRated}
              onChange={event => setLocalRated(Number(event.target.value))}
              onBlur={event =>
                dispatch({
                  type: "SET_OPTION",
                  key: "rated",
                  value: Number(event.target.value)
                })
              }
            />
            likes
          </div>
        ) : (
          "Only show Rated Posts"
        )}
      </Toggle>

      <Toggle
        initial={options.originals}
        onChange={() =>
          dispatch({
            type: "SET_OPTION",
            key: "originals",
            value: !options.originals
          })
        }
      >
        Load Original Sizes
      </Toggle>
    </div>
  );
}

Options.propTypes = {
  options: shape({
    infinite: bool,
    rated: number,
    originals: bool
  }).isRequired,
  dispatch: func.isRequired
};
