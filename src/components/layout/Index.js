import React, { Component } from "react";
import Tracks from "../tracks/Tracks";
import Search from "../tracks/Search";
import { withAuth } from "@okta/okta-react";
// import Log from "../../utils/log";

// Login required to view tracks content

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated: authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login("/");
  }

  async logout() {
    this.props.auth.logout("/");
  }

  render() {
    if (this.state.authenticated === null) {
      return <h1>Please Login</h1>;
    } else {
      return (
        <div>
          {this.state.authenticated ? (
            <React.Fragment>
              <button className="btn mb-4" onClick={this.logout}>
                Logout
              </button>
              <Search />
              <Tracks />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button className="btn mb-4" onClick={this.login}>
                Login
              </button>
            </React.Fragment>
          )}
        </div>
      );
    }
  }
}
export default withAuth(Index);
