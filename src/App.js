import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import Lyrics from "./components/tracks/Lyrics";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import config from "./.ok.config.js";

import { Provider } from "./context";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <Security
            issuer={config.oidc.issuer}
            redirect_uri={config.oidc.redirect_uri}
            client_id={config.oidc.client_id}
          >
            <React.Fragment>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route
                    path="/implicit/callback"
                    component={ImplicitCallback}
                  />
                  <SecureRoute
                    exact
                    path="/lyrics/track/:id"
                    component={Lyrics}
                  />
                </Switch>
              </div>
            </React.Fragment>
          </Security>
        </Router>
      </Provider>
    );
  }
}

export default App;
