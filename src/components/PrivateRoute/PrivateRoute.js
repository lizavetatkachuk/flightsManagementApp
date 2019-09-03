import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../../helpers/authHelper";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const res = getToken();
  return (
    <Route
      {...rest}
      render={props => (res ? <Component /> : <Redirect to="/login" />)}
    />
  );
};
const mapStateToProps = state => {
  return { ...state };
};
export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
