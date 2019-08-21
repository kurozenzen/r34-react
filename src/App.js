import React, { Component } from "react";
import Main from "./pages/Main";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  loadStorage() {
    const activeTags = JSON.parse(localStorage.getItem("tags"));
    const infinite = JSON.parse(localStorage.getItem("infinteScroll"));
    const rated = JSON.parse(localStorage.getItem("showRated"));
    const originals = JSON.parse(localStorage.getItem("originalSizes"));

    return {
      activeTags: activeTags === null ? [] : activeTags,
      infinite: infinite === null ? false : infinite,
      rated: rated === null ? false : rated,
      originals: originals === null ? false : originals
    };
  }

  render() {
    return (
      <Router basename="/r34-react">
        <header className="centered">
          <h1 className="centered">
            Browse <a href="https://rule34.xxx">Rule34</a>
          </h1>
          <div className="container d-flex justify-content-center menu-bar">
            <Link to="/" className="menu-item">
              Search
            </Link>
            <Link to="/help" className="menu-item">
              Help
            </Link>
          </div>
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Main initialState={this.loadStorage()} />}
          />
          <Route exact path="/help" component={Help} />
          <Route component={NotFound} />
        </Switch>
        <div className="spacer" />
        <footer>
          <small>
            <div className="d-flex justify-content-center">
              <p>
                <a href="https://github.com/kurozenzen/r34">
                  Github Repository
                </a>
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <p>
                Please, if you notice{" "}
                <a href="https://github.com/kurozenzen/r34/issues/new?template=bug_report.md">
                  {" "}
                  something isn't right
                </a>
                , or you{" "}
                <a href="https://github.com/kurozenzen/r34/issues/new?template=feature_request.md">
                  want a feature
                </a>{" "}
                to be implemented take the time to let me know.
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <p>Hosted with Github Pages.</p>
            </div>
          </small>
        </footer>
      </Router>
    );
  }
}

export default App;
