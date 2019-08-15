import React, { Fragment } from "react";
import "./header.scss";
class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="navigation-area">
          <a href="http://localhost:3000/" className="main-page">
            Search Flights
          </a>
          <a href="http://localhost:3000/" className="personal-page">
            My flights
          </a>
        </div>
        <div className="title-area">
          <p className="title">EasyFly</p>
        </div>
        <div className="login-button-area">
          <a href="http://localhost:3000/" className="login-button">
            Log In
          </a>
        </div>
      </div>
    );
  }
}
export default Header;
