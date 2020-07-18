import React, { useState } from "react";
import styled, { css } from "styled-components";
import LabeledToggle from "../common/LabeledToggle";
import { useDispatch, useSelector } from "react-redux";
import { selectPreferences } from "../../redux/selectors";
import { setOption } from "../../redux/actions";
import { ThemeType } from "../../misc/theme";

const OptionsWrapper = styled.div(
  (props) => css`
    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

const StyledInput = styled.input(
  (props: { value: number; theme: ThemeType }) => css`
    background: none;
    border: none;
    outline: none;
    color: ${props.theme.colors.accentColor};
    max-height: 16px;
    width: ${0.57 * String(props.value).length}em;
    text-align: right;
    font-size: 14px;
    margin: -1px 0.2em 0 0.2em;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  `
);

export default function Options() {
  const dispatch = useDispatch();
  const { infinite, rated, ratedTreshold, originals } = useSelector(
    selectPreferences
  );

  const [ratedInputValue, setRatedInputValue] = useState(ratedTreshold);

  return (
    <OptionsWrapper>
      <LabeledToggle
        value={infinite}
        onToggle={() => dispatch(setOption("infinite", !infinite))}
      >
        Infinite Scroll
      </LabeledToggle>
      <LabeledToggle
        value={rated}
        onToggle={() => dispatch(setOption("rated", !rated))}
      >
        {rated ? (
          <div style={{ display: "flex" }}>
            Above
            <StyledInput
              type="number"
              value={ratedInputValue}
              onChange={(event) =>
                setRatedInputValue(Number(event.target.value))
              }
              onBlur={() =>
                dispatch(setOption("ratedTreshold", ratedInputValue))
              }
            />
            likes
          </div>
        ) : (
          "Only show Rated Posts"
        )}
      </LabeledToggle>

      <LabeledToggle
        value={originals}
        onToggle={() => dispatch(setOption("originals", !originals))}
      >
        Load Original Sizes
      </LabeledToggle>
    </OptionsWrapper>
  );
}
