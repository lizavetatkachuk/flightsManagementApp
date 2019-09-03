import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Field } from "react-final-form";
import { Link, withRouter } from "react-router-dom";
import { logIn } from "./../../redux/actions/authorisation";
import Button from "./../Shared/Button/Button";
import { mustBeEmail, minLength } from "./../../validators";
import "./login.scss";

const Login = props => {
  const { history, logIn, auth } = props;
  const onSubmit = values => {
    logIn({ ...values, history });
  };
  return (
    <div className="login">
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="login__form">
            {auth.message ? <p className="Error"></p> : null}
            <label className="form-label">Login</label>
            <Field
              className="input-field"
              name="email"
              render={({ input, meta }) => (
                <React.Fragment>
                  {meta.error && meta.touched && (
                    <span className="Error">{meta.error}</span>
                  )}
                  <input {...input} />
                </React.Fragment>
              )}
              validate={mustBeEmail}
            />
            <label className="form-label">Password</label>
            <Field
              className="input-field"
              name="password"
              render={({ input, meta }) => (
                <React.Fragment>
                  {meta.error && meta.touched && (
                    <span className="Error">{meta.error}</span>
                  )}
                  <input {...input} type="password" />
                </React.Fragment>
              )}
              validate={minLength}
            />
            <Button btntype="submit" disabled={submitting || pristine}>
              {" "}
              Log In
            </Button>
          </form>
        )}
      />
      <div className="sign-up">
        <label className="form-label">Do not have an account yet?</label>
        <Link to="/register">
          <Button btntype="button">Register</Button>
        </Link>
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logIn
    },
    dispatch
  );
const mapStateToProps = state => {
  return { ...state };
};
Login.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
