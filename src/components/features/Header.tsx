import React, { RefAttributes } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";
import styled, { css, ThemeProps } from "styled-components";
import R34Icon from "../../icons/R34Icon";
import { BigTitle } from "../common/Title";

const HeaderWrapper = styled.header(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.dimensions.bigSpacing};
  `
);

const Divider = styled.div(
  ({ theme }) => css`
    width: 1px;
    height: 32px;
    margin: 0 ${theme.dimensions.gutter};
    background: ${theme.colors.backgroundColor2};
  `
);

const TitleBar = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.misc.layer};
    padding: ${theme.dimensions.gutter} 0;
    ${theme.shadow.box};
  `
);

const MenuBar = styled.nav(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    gap: ${theme.dimensions.bigSpacing};
  `
);

type LocationStyledLinkProps = LinkProps<unknown> &
  RefAttributes<HTMLAnchorElement> &
  ThemeProps<any> & { current: string };

const LocationStyledLink = styled(Link)(
  ({ to, current, theme }: LocationStyledLinkProps) => css`
    color: ${to === current
      ? theme.colors.accentColor
      : theme.colors.backgroundColor2};
  `
);

export default function Header() {
  const current = useLocation().pathname;

  return (
    <HeaderWrapper role="cell">
      <TitleBar>
        <R34Icon size={32} />
        <Divider />
        <BigTitle>
          Browse <a href="https://rule34.xxx">Rule34</a>
        </BigTitle>
      </TitleBar>

      <MenuBar role="cell">
        <LocationStyledLink current={current} to="/">
          Search
        </LocationStyledLink>
        <LocationStyledLink current={current} to="/help">
          Help
        </LocationStyledLink>
        <LocationStyledLink current={current} to="/settings">
          Settings
        </LocationStyledLink>
      </MenuBar>
    </HeaderWrapper>
  );
}
