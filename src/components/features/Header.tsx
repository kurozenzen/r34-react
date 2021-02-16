import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { HELP, MENU, SEARCH, SETTINGS } from "../../data/types";
import R34Icon from "../../icons/R34Icon";
import { setActiveMenu } from "../../redux/actions";
import { selectActiveMenu } from "../../redux/selectors";
import Button from "../common/Button";
import { BigTitle } from "../common/Title";

const HeaderWrapper = styled.header(
  (props) => css`
    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

const Divider = styled.div(
  (props) => css`
    width: 1px;
    height: 32px;
    margin: 0 ${props.theme.dimensions.gutter};
    background: ${props.theme.colors.backgroundColor2};
  `
);

const TitleBar = styled.div(
  (props) => css`
    background: ${props.theme.misc.layer};
    ${props.theme.shadow.box};
    padding: ${props.theme.dimensions.gutter} 0;
    margin-bottom: ${props.theme.dimensions.bigSpacing};
  `
);

const MenuBar = styled.nav`
  display: flex;
  justify-content: center;
`;

export default function Header() {
  const activeMenu = useSelector(selectActiveMenu);
  const dispatch = useDispatch();

  return (
    <HeaderWrapper role="cell">
      <TitleBar>
        <BigTitle>
          <R34Icon size={32} />
          <Divider />
          <span style={{ marginTop: 2 }}>
            Browse <a href="https://rule34.xxx">Rule34</a>
          </span>
        </BigTitle>
      </TitleBar>

      <MenuBar role="cell">
        <Button
          type={MENU}
          active={activeMenu === SEARCH}
          onClick={() => dispatch(setActiveMenu(SEARCH))}
          label={SEARCH}
        >
          Search
        </Button>
        <Button
          type={MENU}
          active={activeMenu === HELP}
          onClick={() => dispatch(setActiveMenu(HELP))}
          label={HELP}
        >
          Help
        </Button>
        <Button
          type={MENU}
          active={activeMenu === SETTINGS}
          onClick={() => dispatch(setActiveMenu(SETTINGS))}
          label={SETTINGS}
        >
          Settings
        </Button>
      </MenuBar>
    </HeaderWrapper>
  );
}
