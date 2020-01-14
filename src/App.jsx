import React from "react";
import Help from "./pages/Help";
import styled from "styled-components";
import Search from "./pages/Search";
import Reader from "./pages/Reader";
import Header from "./components/features/Header";
import useAppState from "./hooks/useAppState";
import Footer from "./components/features/Footer";
import {
  backgroundColor,
  accentColor,
  backgroundColor2,
  gutter
} from "./misc/style";
import Settings from "./pages/Settings";

const Main = styled.main`
  flex-grow: 1;
  align-self: strech;
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  > *:not(:last-child) {
    margin-bottom: ${gutter};
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: strech;
  min-height: 100%;
  background: ${backgroundColor};
  color: ${backgroundColor2};

  font-size: 14px;

  a {
    color: ${accentColor};
    text-decoration: none;
  }

  > *:not(:last-child) {
    margin-bottom: ${gutter};
  }
`;

function getActivePage(activeMenu, state, dispatch) {
  switch (activeMenu) {
    case "reader":
      return <Reader state={state} dispatch={dispatch} />;
    case "help":
      return <Help state={state} dispatch={dispatch} />;
    case "settings":
      return <Settings state={state} dispatch={dispatch} />;
    case "search":
    default:
      return (
        <Search
          tags={state.tags}
          options={state.options}
          results={state.results}
          dispatch={dispatch}
        />
      );
  }
}

export default function App() {
  const [state, dispatch] = useAppState();

  const activePage = getActivePage(state.context.activeMenu, state, dispatch);

  return (
    <AppWrapper>
      <Header activeMenu={state.context.activeMenu} dispatch={dispatch} />
      <Main>{activePage}</Main>
      <Footer />
    </AppWrapper>
  );
}
