import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import {
  layer,
  backgroundColor2,
  bigSpacing,
  shadow,
  gutter,
} from "../../misc/style";
import { BigTitle } from "../common/Title";
import R34Icon from "../../icons/R34Icon";

const HeaderWrapper = styled.header`
  > *:not(:last-child) {
    margin-bottom: ${gutter};
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 32px;
  margin: 0 ${gutter};
  background: ${backgroundColor2};
`;

const TitleBar = styled.div`
  background: ${layer};
  ${shadow};
  padding: ${gutter} 0;
  margin-bottom: ${bigSpacing};
`;

const MenuBar = styled.nav`
  display: flex;
  justify-content: center;
`;

function Header({ activeMenu, dispatch }) {
  return (
    <HeaderWrapper>
      <TitleBar>
        <BigTitle>
          <R34Icon size={32} />
          <Divider />
          <span style={{ marginTop: 2 }}>
            Browse <a href="https://rule34.xxx">Rule34</a>
          </span>
        </BigTitle>
      </TitleBar>

      <MenuBar>
        <Button
          type="menu"
          active={activeMenu === "search"}
          onClick={() => dispatch({ type: "SET_ACTIVE_MENU", menu: "search" })}
        >
          Search
        </Button>
        <Button
          type="menu"
          active={activeMenu === "help"}
          onClick={() => dispatch({ type: "SET_ACTIVE_MENU", menu: "help" })}
        >
          Help
        </Button>
        <Button
          type="menu"
          active={activeMenu === "settings"}
          onClick={() =>
            dispatch({ type: "SET_ACTIVE_MENU", menu: "settings" })
          }
        >
          Settings
        </Button>
      </MenuBar>
    </HeaderWrapper>
  );
}

Header.propTypes = {};

export default Header;
