import React from "react";
import Header from "./components/features/Header";
import Footer from "./components/features/Footer";
import styled, { css } from "styled-components";
import { MenuType } from "./data/types";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import { selectActiveMenu } from "./redux/selectors";

const Main = styled.main(
  (props) => css`
    flex-grow: 1;
    align-self: strech;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    max-width: 1000px;
    margin: auto;

    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

const AppWrapper = styled.div(
  (props) => css`
    display: flex;
    flex-direction: column;
    align-items: strech;
    min-height: 100%;
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

function AppContent() {
  const activeMenu = useSelector(selectActiveMenu);
  const activePage = getActivePage(activeMenu);

  return (
    <AppWrapper>
      <Header />
      <Main>{activePage}</Main>
      <Footer />
    </AppWrapper>
  );
}

AppContent.propTypes = {};

export default AppContent;
