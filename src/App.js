import React, { Component } from 'react';
import Search from './pages/Search';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render(){
    return(
      <Router>
        <header>
          <h1 className="centered">Browse <a href="https://rule34.xxx">Rule34</a></h1>
          <div className="container d-flex justify-content-center menu-bar">
            <Link to="/" className="menu-item">Search</Link>
            <Link to="/help" className="menu-item">Help</Link>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/help" component={Help} />
          <Route component={NotFound} />
        </Switch>
        <footer>
          <div className="d-flex justify-content-center">
            <p>
              <a href="https://github.com/kurozenzen/r34">Github Repository</a>
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <p>Please, if you notice
              <a href="https://github.com/kurozenzen/r34/issues/new?template=bug_report.md">something isn't right</a>, or you
              <a href="https://github.com/kurozenzen/r34/issues/new?template=feature_request.md">want a feature</a> to be implemented take the time to let me know.
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <p>Hosted with Github Pages.</p>
          </div>
        </footer>
      </Router>
    );
  }
}

export default App;
