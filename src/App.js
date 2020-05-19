import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

class RenderRoutes extends React.Component {
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={(props) => (
            <Home
              {...props}
              loggedInStatus={this.isLoggedIn}
              handleLogout={this.handleLogout}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => (
            <Login
              {...props}
              handleLogin={this.handleLogin}
              loggedInStatus={this.isLoggedIn}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(props) => (
            <Signup
              {...props}
              handleLogin={this.handleLogin}
              loggedInStatus={this.isLoggedIn}
            />
          )}
        />
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: {},
  };

  getUser = () => {
    axios
      .get("http://localhost:3000/logged_in", {
        withCredientials: true,
      })
      .then((response) => {
        if (response.data.logged_in) {
          this.handleLogin(response);
        } else {
          this.handleLogout();
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  handleLogin = (data) => {
    this.state({
      isLoggedIn: true,
      user: data.user,
    });
  };

  handleLogout = (data) => {
    this.state({
      isLoggedIn: false,
      user: {},
    });
  };

  componentDidMount() {
    this.getUser();
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null;
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </nav>
        </div>
        <RenderRoutes />
      </Router>
    );
  }
}
export default App;
