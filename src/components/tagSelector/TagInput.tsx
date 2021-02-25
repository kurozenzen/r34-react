import React from "react"
import styled, { css } from "styled-components"

const Input = styled.input(
  (props) => css`
    width: 100%;
    border: none;
    outline: none;
    background: none;
    font-size: ${props.theme.fontSizes.content};
    border-top: ${props.theme.colors.accentColor} ${props.theme.dimensions.borderWidth} solid;
    border-bottom: ${props.theme.colors.accentColor} ${props.theme.dimensions.borderWidth} solid;
  `
)

interface TagInputProps {
  value: string
  setValue: (newValue: string) => void
}

export default function TagInput(props: TagInputProps) {
  const { value, setValue } = props
  return (
    <Input
      id="tag-input"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Search for tags"
      aria-label="Search"
    />
  )
}
