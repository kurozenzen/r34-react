import styled, { css } from 'styled-components'
import { flexRowWithGap } from '../../styled/mixins/layout'

export const Title = styled.h2(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.bigTitle};
    font-weight: lighter;
    text-align: center;
  `
)

export const BigTitle = styled.h1(
  ({ theme }) => css`
    ${flexRowWithGap({ theme })}

    justify-content: center;
    font-size: ${theme.fontSizes.bigTitle};
    font-weight: lighter;
    text-align: center;
  `
)

export const SmallTitle = styled.h3(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.content};
  `
)

export const Faded = styled.span(
  ({ theme }) => css`
    color: ${theme.colors.subduedText};
  `
)
