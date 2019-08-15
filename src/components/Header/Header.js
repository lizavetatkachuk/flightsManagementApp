import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="navigation-area">
          <Link to="/" className="main-page">
            Search Flights
          </Link>
          <Link to="/basket" className="personal-page">
            My flights
          </Link>
        </div>
        <div className="title-area">
          <p className="title">EasyFly</p>
        </div>
        <div className="login-button-area">
          <Link to="/login" className="login-button">
            Log In
          </Link>
        </div>
      </div>
    );
  }
}
export default Header;
