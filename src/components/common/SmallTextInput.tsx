import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled, { css } from "styled-components";

const TextInput = styled.input(
  ({ theme }) => css`
    width: 50px;
    border: ${theme.dimensions.borderWidth} solid ${theme.colors.accentColor};
    background-color: ${theme.colors.backgroundColor2};
    padding: ${theme.dimensions.spacing};
    border-radius: ${theme.dimensions.borderRadius};
    text-align: center;
    height: ${theme.dimensions.blockHeight};
  `
);

interface SmallTextInputProps {
  value: string | number;
  onSubmit: (value: string | number) => void;
}

export default function SmallTextInput(props: SmallTextInputProps) {
  const { value, onSubmit } = props;
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setInternalValue(event.target.value);
    },
    []
  );

  const onBlur = useCallback(() => {
    onSubmit(internalValue);
  }, [internalValue, onSubmit]);

  const onKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onSubmit(internalValue);
      }
    },
    [internalValue, onSubmit]
  );

  return (
    <TextInput
      type="text"
      value={internalValue}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
}
