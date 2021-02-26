import React, { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { defaultBorder, defaultBlock } from '../../styled/mixins'

const StyledInput = styled.input(
  ({ theme }) => css`
    width: 50px;
    ${defaultBorder({ theme })}
    background-color: ${theme.colors.backgroundColor2};
    ${defaultBlock({ theme })}
    text-align: center;
  `
)

interface SmallInputProps<T> {
  value: T
  onSubmit: (value: T) => void
}

export function SmallTextInput(props: SmallInputProps<string>) {
  const { value, onSubmit } = props
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setInternalValue(event.target.value)
  }, [])

  const onBlur = useCallback(() => {
    onSubmit(internalValue)
  }, [internalValue, onSubmit])

  const onKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        onSubmit(internalValue)
      }
    },
    [internalValue, onSubmit]
  )

  return <StyledInput type='text' value={internalValue} onChange={onChange} onBlur={onBlur} onKeyDown={onKeyDown} />
}

export function SmallNumberInput(props: SmallInputProps<number>) {
  const { value, onSubmit } = props
  const [internalValue, setInternalValue] = useState(value.toString())

  useEffect(() => {
    setInternalValue(value.toString())
  }, [value])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setInternalValue(event.target.value)
  }, [])

  const onBlur = useCallback(() => {
    onSubmit(Number(internalValue))
  }, [internalValue, onSubmit])

  const onKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        onSubmit(Number(internalValue))
      }
    },
    [internalValue, onSubmit]
  )

  return <StyledInput type='number' value={internalValue} onChange={onChange} onBlur={onBlur} onKeyDown={onKeyDown} />
}
