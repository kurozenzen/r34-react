import React, { ChangeEventHandler, KeyboardEventHandler, useCallback } from 'react'
import styled, { css } from 'styled-components'

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
  onSubmit: () => void
}

export default function TagInput(props: TagInputProps) {
  const { value, setValue, onSubmit } = props

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.target.value)
    },
    [setValue]
  )

  const handleEnter: KeyboardEventHandler = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        onSubmit()
      }
    },
    [onSubmit]
  )

  return (
    <Input
      id='tag-input'
      value={value}
      onChange={handleChange}
      onKeyDown={handleEnter}
      placeholder='Search for tags'
      aria-label='Search'
    />
  )
}
