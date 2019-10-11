import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken, checkAdmin } from "../../helpers/authHelper";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, userRole, ...rest }) => {
  const token = getToken();
  const role = checkAdmin(token);

  switch (userRole) {
    case "client":
      return (
        <Route
          {...rest}
          render={props => (token ? <Component /> : <Redirect to="/login" />)}
        />
      );
    case "admin":
      return (
        <Route
          {...rest}
          render={props =>
            role === "admin" ? <Component /> : <Redirect to="/login" />
          }
        />
      );
    default:
      return <Redirect to="/"></Redirect>;
  }
};

const mapStateToProps = state => {
  const { auth } = state;
  return auth;
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
