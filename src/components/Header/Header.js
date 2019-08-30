import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { logOut } from "./../../redux/actions/authorisation";
import Button from "./../Shared/Button/Button";
import { getToken, removeToken } from "../../helpers/authHelper";
import "./header.scss";

const Header = props => {
  const { logOut } = props;
  const res = getToken();
  return (
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
        {res ? (
          <Button
            btntype="button"
            btnclass="nav-btn"
            onClick={() => {
              removeToken();
              logOut();
            }}
          >
            Log Out
          </Button>
        ) : (
          <NavLink to="/login" className="nav-btn">
            <Button btntype="button" btnclass="nav-btn">
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
  return { ...state };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
