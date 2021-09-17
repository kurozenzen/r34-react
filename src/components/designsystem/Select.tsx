import React, { ChangeEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { defaultBlock } from '../../styled/mixins/layout'
import { defaultBorder, defaultInput } from '../../styled/mixins/theming'

const Wrapper = styled.div(
  ({ theme }) => css`
    width: 120px;
    height: ${theme.dimensions.blockHeight};
  `
)

const StyledSelect = styled.select`
  ${defaultInput}

  width: 100%;
  height: 100%;
`

const Option = styled.option(
  ({ theme }) => css`
    ${defaultBorder({ theme })}
    background-color: ${theme.colors.backgroundColor2};
    ${defaultBlock({ theme })}
  `
)

interface SelectProps {
  options: Record<string, string>
  value: string
  onChange: ChangeEventHandler
}

export default function Select(props: SelectProps) {
  const { options, value, onChange } = props

  return (
    <Wrapper>
      <StyledSelect value={value} onChange={onChange}>
        {Object.entries(options).map(([optionKey, optionValue]) => (
          <Option key={optionKey} value={optionKey}>
            {optionValue}
          </Option>
        ))}
      </StyledSelect>
    </Wrapper>
  )
}
