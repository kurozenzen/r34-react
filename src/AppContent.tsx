import React, { useMemo } from "react";
import styled, { css } from "styled-components";
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
    font-size: ${props.theme.fontSizes.content};

    a {
      color: ${props.theme.colors.accentColor};
      text-decoration: none;
    }

    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

export default function AppContent() {
  const activeMenu = useSelector(selectActiveMenu);
  const cookies = useSelector(selectCookies);

  const pages = useMemo(
    () => ({
      help: <Help />,
      settings: <Settings />,
      search: <Search />,
    }),
    []
  );

  return (
    <AppWrapper>
      {pages[activeMenu]}
      {!cookies && <CookieConfirmation />}
    </AppWrapper>
  );
}
