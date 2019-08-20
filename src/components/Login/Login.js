import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { Link, withRouter } from "react-router-dom";
import Button from "./../Shared/Button/Button";
import { mustBeEmail, minLength } from "./../../validators";
import "./login.scss";

const Login = props => {
  const onSubmit = values => {
    console.log(`Form values: ${JSON.stringify(values, null, 4)}`);
    props.history.push("/");
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
            <label className="form-label">Login</label>
            <Field
              className="input-field"
              name="login"
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
            <Button type="submit"> Log In</Button>
          </form>
        )}
      />
      <div className="sign-up">
        <label className="form-label">Do not have an account yet?</label>
        <Link to="/register">
          <Button type="button">Register</Button>
        </Link>
      </div>
    </div>
  );
};
Login.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
export default withRouter(Login);
