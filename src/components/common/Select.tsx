import React, { ChangeEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { defaultBorder, defaultBlock } from '../../styled/mixins'

const Wrapper = styled.div(
  ({ theme }) => css`
    width: 100px;
    height: ${theme.dimensions.blockHeight};
  `
)

const StyledSelect = styled.select(
  ({ theme }) => css`
    ${defaultBorder({ theme })}
    ${defaultBlock({ theme })}
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.backgroundColor2};
  `
)

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
