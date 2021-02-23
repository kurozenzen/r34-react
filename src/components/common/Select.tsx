import React, { ChangeEventHandler } from "react";
import styled, { css } from "styled-components";

const SelectWrapper = styled.select(
  ({ theme }) => css`
    width: 100px;
    border: ${theme.dimensions.borderWidth} solid ${theme.colors.accentColor};
    background-color: ${theme.colors.backgroundColor2};
    padding: ${theme.dimensions.spacing};
    border-radius: ${theme.dimensions.borderRadius};
    height: ${theme.dimensions.blockHeight};
  `
);

const Option = styled.option(
  ({ theme }) => css`
    border: ${theme.dimensions.borderWidth} solid ${theme.colors.accentColor};
    background-color: ${theme.colors.backgroundColor2};
    padding: ${theme.dimensions.spacing};
    border-radius: ${theme.dimensions.borderRadius};
    text-align: center;
  `
);

interface SelectProps {
  options: Record<string, string>;
  value: string;
  onChange: ChangeEventHandler;
}

export default function Select(props: SelectProps) {
  const { options, value, onChange } = props;
  return (
    <SelectWrapper value={value} onChange={onChange}>
      {Object.entries(options).map(([optionKey, optionValue]) => (
        <Option key={optionKey} value={optionKey}>
          {optionValue}
        </Option>
      ))}
    </SelectWrapper>
  );
}
