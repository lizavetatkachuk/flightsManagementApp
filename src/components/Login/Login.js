import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Field } from "react-final-form";
import { Link, withRouter } from "react-router-dom";
import { requestLogin } from "./../../redux/actions/authorisation";
import Button from "./../Shared/Button/Button";
import { mustBeEmail, minLength } from "./../../validators";
import "./login.scss";

const Login = props => {
  const { history, requestLogin, message } = props;
  const onSubmit = values => {
    requestLogin({ ...values, history });
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
            {message ? <p className="server-error"></p> : null}
            <label className="form-label">Login</label>
            <Field
              name="email"
              render={({ input, meta }) => (
                <div className='field'>
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
                  <input className="input-field" {...input} />
                </div>
              )}
              validate={mustBeEmail}
            />
            <label className="form-label">Password</label>
            <Field
              name="password"
              render={({ input, meta }) => (
                <div className='field'>
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
                  <input className="input-field" {...input} type="password" />
                </div>
              )}
              validate={minLength}
            />
            <Button btntype="submit" disabled={submitting || pristine}>
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
      requestLogin
    },
    dispatch
  );
const mapStateToProps = state => {
  const { auth } = state;
  return auth;
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
