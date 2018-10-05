import React, { Component } from "react";
import Header from "./Header/Header";
import Container from "./Container/Container";
import store from "./Store/store";
import { BrowserRouter as Router,Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
      <Route
        path="/"
        render={routeProps => (
          <div {...this.props} {...routeProps}>
            <Header store={store} />
            <Container store={store} {...routeProps}/>
          </div>
        )}
      />
      </Router>
    );
  }
}

export default App;
