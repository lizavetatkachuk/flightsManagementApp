import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
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
    <Link to="/" className="header__title">
      <p className="title">Search Flights</p>
    </Link>
    <div className="header__login">
      <NavLink to="/login" className="nav-btn">
        <Button btntype="button" btnclass="nav-btn" logged="false">
          Log In
        </Button>
      </NavLink>
    </div>
  </header>
);
export default withRouter(Header);
