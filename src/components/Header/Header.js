import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";
const Header = () => (
  <header className="header">
    <nav className="navigation-area">
      <NavLink exact to="/" className="main-page" activeClassName="selected">
        Search Flights
      </NavLink>
      <NavLink
        to="/basket"
        className="personal-page"
        activeClassName="selected"
      >
        My flights
      </NavLink>
    </nav>
    <div className="title-area">
      <p className="title">EasyFly</p>
    </div>
    <div className="login-button-area">
      <NavLink to="/login" className="login-button" activeClassName="selected">
        Log In
      </NavLink>
    </div>
  </header>
);

export default Header;
