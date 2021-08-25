import styled, { css } from 'styled-components'
import R34Icon from '../../icons/R34Icon'
import { flexColumn, flexRowWithGap } from '../../styled/mixins/layout'
import { SolidSurface } from '../designsystem/Surface'
import { BigTitle } from '../designsystem/Text'
import Menubar from './Menubar'

const HeaderWrapper = styled.header(
  ({ theme }) => css`
    ${flexColumn}
    background: ${theme.colors.layerBgSolid};
  `
)

const TitleBar = styled(SolidSurface)(
  ({ theme }) => css`
    ${flexRowWithGap({ theme })}
    justify-content: center;

    padding: ${theme.dimensions.bigSpacing} 0;
  `
)

export default function Header() {
  return (
    <HeaderWrapper role='cell'>
      <TitleBar>
        <R34Icon size={32} />
        <BigTitle>
          <span>Browse</span> <a href='https://rule34.xxx'>Rule34</a>
        </BigTitle>
      </TitleBar>
      <Menubar />
    </HeaderWrapper>
  )
}
