import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
const Header = () => (
  <header className="header">
    <nav className="navigation-area">
      <button className="main-page" type="button">
        Search Flights
      </button>
      <button className="personal-page" type="button">
        My flights
      </button>
    </nav>
    <div className="title-area">
      <p className="title">EasyFly</p>
    </div>
    <div className="login-button-area">
      <button className="login-button" type="button">
        Log In
      </button>
    </div>
  </header>
);

export default Header;
