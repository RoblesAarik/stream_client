import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import GoogleAuth from "./GoogleAuth";

class Header extends React.Component {
  render() {
    return (
      <div className="headerWrapper">
        <div className="headerTitle">
          <Link to="/">Streamer</Link>
        </div>
        <div className="otherLinks">
          <Link to="/">All Streams</Link>
          <GoogleAuth />
        </div>
      </div>
    );
  }
}

export default Header;
