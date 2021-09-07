import { RefAttributes } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import styled, { css, ThemeProps } from 'styled-components'
import { RouteName } from '../../data/types'
import { buttonBaseStyle, flexRowWithGap } from '../../styled/mixins/layout'

const MenuBar = styled.nav`
  ${flexRowWithGap}
  place-content: center;
`

type LocationStyledLinkProps = LinkProps<unknown> &
  RefAttributes<HTMLAnchorElement> &
  ThemeProps<any> & { current: string }

const LocationStyledLink = styled(Link)(
  ({ to, current, theme }: LocationStyledLinkProps) => css`
    ${buttonBaseStyle}
    color: ${to === current ? theme.colors.accentColor : theme.colors.text};
    border-bottom: solid transparent ${theme.dimensions.borderWidth};
    border-bottom-color: ${to === current
      ? css`
          ${theme.colors.accentColor}
        `
      : 'none'};
    border-radius: 0px;
  `
)

export default function Menu() {
  const current = useLocation().pathname

  return (
    <MenuBar>
      <LocationStyledLink current={current} to={RouteName.SEARCH}>
        <span>Search</span>
      </LocationStyledLink>

      <LocationStyledLink current={current} to={RouteName.PREFERENCES}>
        <span>Preferences</span>
      </LocationStyledLink>

      <LocationStyledLink current={current} to={RouteName.ABOUT}>
        <span>About</span>
      </LocationStyledLink>
    </MenuBar>
  )
}
