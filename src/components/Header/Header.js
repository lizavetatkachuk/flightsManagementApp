import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { logOut } from "./../../redux/actions/authorisation";
import Button from "./../Shared/Button/Button";
import { getToken, removeToken, checkAdmin } from "../../helpers/authHelper";
import logout from "./../../static/images/logout.svg";
import menu from "./../../static/images/menu.svg";
import "./header.scss";

const Header = props => {
  const { logOut, onClick, history } = props;
  const token = getToken();
  const role = checkAdmin();

  return (
    <header className="header">
      <nav className="header__nav navigation">
        <img
          src={menu}
          className="mobile__menu"
          alt="mobile-menu-tab"
          onClick={onClick}
        ></img>
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
          <React.Fragment>
            <Button
              btntype="button"
              btnclass="navigation__btn "
              onClick={() => {
                removeToken();
                logOut();
              }}
            >
              Log Out
            </Button>
            <img
              className="mobile__login"
              alt="mobile-logout-btn"
              src={logout}
              onClick={() => {
                removeToken();
                logOut();
              }}
            ></img>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink to="/login" className="navigation__btn ">
              <Button btntype="button" btnclass="navigation__btn">
                Log In
              </Button>
            </NavLink>
            <img
              className="mobile__login"
              alt="mobile-logout-btn"
              src={logout}
              onClick={() => {
                history.push("/login");
              }}
            ></img>
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
  const { auth } = state;
  return auth;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
