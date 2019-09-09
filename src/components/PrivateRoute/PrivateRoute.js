import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken, checkAdmin } from "../../helpers/authHelper";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, userRole, ...rest }) => {
  const token = getToken();
  const role = checkAdmin(token);
  console.log(userRole);
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
          render={props => (role ? <Component /> : <Redirect to="/login" />)}
        />
      );
  }
};
const mapStateToProps = state => {
  return { ...state };
};
export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
