import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { logOut } from "./../../redux/actions/authorisation";
import Button from "./../Shared/Button/Button";
import { getToken, removeToken, checkAdmin } from "../../helpers/authHelper";
import logout from "./../../static/images/logout.svg";
import login from "./../../static/images/login.svg";
import menu from "./../../static/images/menu.svg";
import "./header.scss";

const Header = props => {
  const { logOut, onClick, history } = props;
  const token = getToken();
  const role = checkAdmin();

  const LogOut = () => {
    removeToken();
    logOut();
  };
  const redirect = () => {
    history.push("/login");
  };

  return (
    <header className="header">
      <nav className="header__nav navigation">
        <img
          src={menu}
          className="mobile__menu"
          alt="mobile-menu-tab"
          onClick={onClick}
        />
        <NavLink
          exact
          to="/"
          className="navigation__btn"
          activeClassName="navigation__btn--selected"
        >
          Search
        </NavLink>
        {token && (
          <NavLink
            to="/orders"
            className="navigation__btn"
            activeClassName="navigation__btn--selected"
          >
            Flights
          </NavLink>
        )}
        {role === "admin" && (
          <NavLink
            to="/admin"
            className="navigation__btn"
            activeClassName="navigation__btn--selected"
          >
            Admin
          </NavLink>
        )}
      </nav>
      <Link to="/" className="header__title">
        EasyFly
      </Link>
      <div className="header__login ">
        {token ? (
          <React.Fragment>
            <Button
              btntype="button"
              btnclass="navigation__btn "
              onClick={LogOut}
            >
              Log Out
            </Button>
            <img
              className="mobile__login"
              alt="mobile-logout-btn"
              src={logout}
              onClick={LogOut}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink
              to="/login"
              className="navigation__btn"
              activeClassName="navigation__btn--selected"
            >
              Log In
            </NavLink>
            <img
              className="mobile__login"
              alt="mobile-logout-btn"
              src={login}
              onClick={redirect}
            />
          </React.Fragment>
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
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
