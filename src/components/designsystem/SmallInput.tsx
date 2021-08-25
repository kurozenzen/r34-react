import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { defaultInput } from '../../styled/mixins/theming'

const StyledInput = styled.input`
  ${defaultInput}

  width: 70px;
  text-align: left;
`

interface SmallTextInputProps {
  value: string
  onSubmit: (value: string) => void
  className?: string
}

interface SmallNumberInputProps {
  value: number
  onSubmit: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function SmallTextInput(props: SmallTextInputProps) {
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

export function SmallNumberInput(props: SmallNumberInputProps) {
  const { value, onSubmit, className, min, max, step } = props
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
      min={min}
      max={max}
      step={step}
      value={internalValue}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={blurOnEnter}
      className={className}
    />
  )
}
