import React, { useState } from "react";
import { shape, bool, number, func } from "prop-types";
import styled from "styled-components";
import Toggle from "../common/Toggle";
import { accentColor, gutter } from "../../misc/style";

const OptionsWrapper = styled.div`
  > *:not(:last-child) {
    margin-bottom: ${gutter};
  }
`;

const StyledInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: ${accentColor};
  max-height: 16px;
  width: ${({ value }) => 0.57 * String(value).length}em;
  text-align: right;
  font-size: 14px;
  margin: -1px 0.2em 0 0.2em;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export default function Options({ options, dispatch }) {
  const [localRated, setLocalRated] = useState(1);

  return (
    <OptionsWrapper>
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
              type="number"
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
    </OptionsWrapper>
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
