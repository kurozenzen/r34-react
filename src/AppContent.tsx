import React from "react";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import CookieConfirmation from "./components/features/CookieConfirmation";
import { Switch, Route, HashRouter } from "react-router-dom";

export default function AppContent() {
  return (
    <HashRouter basename="/r34-react">
      <Switch>
        <Route path="/help">
          <Help />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <Search />
        </Route>
      </Switch>

      <CookieConfirmation />
    </HashRouter>
  );
}
