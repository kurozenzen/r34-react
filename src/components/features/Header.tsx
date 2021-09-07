import styled, { css } from 'styled-components'
import R34Icon from '../../icons/R34Icon'
import { defaultSpacing } from '../../styled/mixins/gap'
import { flexColumn } from '../../styled/mixins/layout'
import FlexPair from '../designsystem/FlexPair'
import { BigTitle } from '../designsystem/Text'
import OfflineIndicator from '../widgets/OfflineIndicator'
import Menubar from '../widgets/Menubar'
import React from 'react'

const HeaderWrapper = styled.header(
  ({ theme }) => css`
    ${flexColumn}
    background: ${theme.colors.layerBgSolid};
  `
)

const TitleBar = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${defaultSpacing}

    > :first-child,
    > :last-child {
      width: ${theme.dimensions.blockHeight};
    }
  `
)

export default function Header() {
  return (
    <HeaderWrapper role='cell'>
      <TitleBar>
        <div>{/*placeholder*/}</div>
        <FlexPair>
          <R34Icon size={32} />
          <BigTitle>Rule34 React</BigTitle>
        </FlexPair>
        <OfflineIndicator />
      </TitleBar>
      <Menubar />
    </HeaderWrapper>
  )
}
