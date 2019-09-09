import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { logOut } from "./../../redux/actions/authorisation";
import Button from "./../Shared/Button/Button";
import { getToken, removeToken, checkAdmin } from "../../helpers/authHelper";
import "./header.scss";

const Header = props => {
  const { logOut, auth } = props;
  const token = getToken();
  const role = checkAdmin();
  return (
    <header className="header">
      <nav className="header__nav navigation">
        <NavLink
          exact
          to="/"
          className="navigation__btn"
          activeClassName="selected"
        >
          Search Flights
        </NavLink>
        <NavLink
          to="/orders"
          className="navigation__btn"
          activeClassName="selected"
        >
          My flights
        </NavLink>
        {role === "admin" ? (
          <NavLink
            to="/admin"
            className="navigation__btn"
            activeClassName="selected"
          >
            Admin Pane
          </NavLink>
        ) : null}
      </nav>
      <Link to="/" className="header__title">
        EasyFly
      </Link>
      <div className="header__login">
        {token ? (
          <Button
            btntype="button"
            btnclass="navigation__btn"
            onClick={() => {
              removeToken();
              logOut();
            }}
          >
            Log Out
          </Button>
        ) : (
          <NavLink to="/login" className="navigation__btn">
            <Button btntype="button" btnclass="navigation__btn">
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
