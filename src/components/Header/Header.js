import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Button from "./../Shared/Button/Button";
import "./header.scss";

const Header = () => (
  <header className="header">
    <nav className="header__nav">
      <NavLink exact to="/" className="nav-btn" activeClassName="selected">
        Search Flights
      </NavLink>
      <NavLink to="/basket" className="nav-btn" activeClassName="selected">
        My flights
      </NavLink>
    </nav>
    <div className="title-area">
      <p className="title">EasyFly</p>
    </div>
    <div className="header__login">
      <NavLink to="/login" className="nav-btn">
        <Button type="button" class="nav-btn" logged="false">
          Log In
        </Button>
      </NavLink>
    </div>
  </header>
);

export default withRouter(Header);
