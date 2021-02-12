import React from "react";
import styled, { css } from "styled-components";
import { MenuType } from "./data/types";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import { selectActiveMenu, selectCookies } from "./redux/selectors";
import CookieConfirmation from "./components/features/CookieConfirmation";

const AppWrapper = styled.div(
  (props) => css`
    display: flex;
    flex-direction: column;
    align-items: strech;
    width: 100vw;
    min-height: 100vh;
    background: ${props.theme.colors.backgroundColor};
    color: ${props.theme.colors.backgroundColor2};

    font-size: 14px;

    a {
      color: ${props.theme.colors.accentColor};
      text-decoration: none;
    }

    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

function getActivePage(activeMenu: MenuType) {
  switch (activeMenu) {
    case "help":
      return <Help />;
    case "settings":
      return <Settings />;
    case "search":
    default:
      return <Search />;
  }
}

export default function AppContent() {
  const activeMenu = useSelector(selectActiveMenu);
  const cookies = useSelector(selectCookies);

  const activePage = getActivePage(activeMenu);

  return (
    <AppWrapper>
      {activePage}
      {!cookies && <CookieConfirmation />}
    </AppWrapper>
  );
}
