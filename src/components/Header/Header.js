import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { logOut } from "./../../redux/actions/authorisation";
import Button from "./../Shared/Button/Button";
import { getToken, removeToken, checkAdmin } from "../../helpers/authHelper";
import "./header.scss";

const Header = props => {
  const { logOut,onClick } = props;
  const token = getToken();
  const role = checkAdmin();

  return (
    <header className="header">
      <nav className="header__nav navigation">
        <div className='navigation__btn mobile__menu' onClick={onClick}>
Menu
        </div>
        <NavLink
          exact
          to="/"
          className="navigation__btn"
          activeClassName="navigation__btn--selected"
        >
          Search Flights
        </NavLink>
        <NavLink
          to="/orders"
          className="navigation__btn"
          activeClassName="navigation__btn--selected"
        >
          My flights
        </NavLink>
        {role === "admin" ? (
          <NavLink
            to="/admin"
            className="navigation__btn"
            activeClassName="navigation__btn--selected"
          >
            Admin Pane
          </NavLink>
        ) : null}
      </nav>
      <Link to="/" className="header__title">
        EasyFly
      </Link>
      <div className="header__login ">
        {token ? (
          <Button
            btntype="button"
            btnclass="navigation__btn mobile__login"
            onClick={() => {
              removeToken();
              logOut();
            }}
          >
            Log Out
          </Button>
        ) : (
          <NavLink to="/login" className="navigation__btn mobile__login">
            <Button btntype="button" btnclass="navigation__btn mobile__login">
              Log In
            </Button>
          </NavLink>
        )}
      </div>
    </header>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logOut
    },
    dispatch
  );

const mapStateToProps = state => {
  const { auth } = state;
  return auth;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
