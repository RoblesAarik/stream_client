import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import GoogleAuth from "./GoogleAuth";

class Header extends React.Component {
  render() {
    return (
      <div className="headerWrapper">
        <div className="headerTitle">
          <Link to="/">Reverb</Link>
        </div>
        <div className="otherLinks">
          <Link className="link" to="/">
            All Streams
          </Link>
          <Link className="link" to="/create">
            Start a Stream
          </Link>
          <GoogleAuth />
        </div>
      </div>
    );
  }
}

export default Header;
