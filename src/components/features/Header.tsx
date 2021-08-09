import React, { RefAttributes } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import styled, { css, ThemeProps } from 'styled-components'
import { RouteName } from '../../data/types'
import R34Icon from '../../icons/R34Icon'
import { boxShadow, flexColumn, flexColumnGap, flexRowGap, flexRowWithGap } from '../../styled/mixins'
import { VerticalLine } from '../designsystem/Lines'
import { BigTitle } from '../designsystem/Text'

const HeaderWrapper = styled.header(
  ({ theme }) => css`
    ${flexColumn()}
    ${flexColumnGap(theme.dimensions.bigSpacing)}
  `
)

const TitleBar = styled.div(
  ({ theme }) => css`
    ${flexRowWithGap({ theme })}
    justify-content: center;
    background: ${theme.colors.layerBgSolid};
    padding: ${theme.dimensions.gutter} 0;
    ${boxShadow({ theme })}
  `
)

const MenuBar = styled.nav(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    padding: ${theme.dimensions.bigSpacing};
    ${flexRowGap(theme.dimensions.hugeSpacing)}
  `
)

type LocationStyledLinkProps = LinkProps<unknown> &
  RefAttributes<HTMLAnchorElement> &
  ThemeProps<any> & { current: string }

const LocationStyledLink = styled(Link)(
  ({ to, current, theme }: LocationStyledLinkProps) => css`
    color: ${to === current ? theme.colors.accentColor : theme.colors.text};
  `
)

export default function Header() {
  const current = useLocation().pathname

  return (
    <HeaderWrapper role='cell'>
      <TitleBar>
        <R34Icon size={32} />
        <VerticalLine />
        <BigTitle>
          <span>Browse</span> <a href='https://rule34.xxx'>Rule34</a>
        </BigTitle>
      </TitleBar>

      <MenuBar>
        <LocationStyledLink current={current} to={RouteName.SEARCH}>
          Search
        </LocationStyledLink>
        <VerticalLine />
        <LocationStyledLink current={current} to={RouteName.SETTINGS}>
          Settings
        </LocationStyledLink>
        <VerticalLine />
        <LocationStyledLink current={current} to={RouteName.ABOUT}>
          About
        </LocationStyledLink>
      </MenuBar>
    </HeaderWrapper>
  )
}
