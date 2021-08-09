import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { defaultBorder, defaultBlock } from '../../styled/mixins'

const StyledInput = styled.input(
  ({ theme }) => css`
    width: 70px;
    ${defaultBorder({ theme })}
    background-color: ${theme.colors.backgroundColor2};
    ${defaultBlock({ theme })}
    text-align: left;
  `
)

interface SmallInputProps<T> {
  value: T
  onSubmit: (value: T) => void
  className?: string
}

export function SmallTextInput(props: SmallInputProps<string>) {
  const { value, onSubmit, className } = props
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

  const blurOnEnter = useCallback((event) => {
    if (event.key === 'Enter') {
      event.target.blur()
    }
  }, [])

  return (
    <StyledInput
      type='text'
      value={internalValue}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={blurOnEnter}
      className={className}
    />
  )
}

export function SmallNumberInput(props: SmallInputProps<number>) {
  const { value, onSubmit, className } = props
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

  const blurOnEnter = useCallback((event) => {
    if (event.key === 'Enter') {
      event.target.blur()
    }
  }, [])

  return (
    <StyledInput
      type='number'
      value={internalValue}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={blurOnEnter}
      className={className}
    />
  )
}
