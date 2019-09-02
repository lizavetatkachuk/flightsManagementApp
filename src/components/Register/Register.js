import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { withRouter } from "react-router-dom";
import Button from "./../Shared/Button/Button";
import { mustBeEmail, validatePassword } from "./../../validators";
import "./../Login/login.scss";

const Register = props => {
  const onSubmit = values => {
    console.log(`Form values: ${JSON.stringify(values, null, 4)}`);
    props.history.push("/");
  };
  return (
    <div className="register">
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
          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.confirmpassword) {
            errors.confirmpassword = "Required";
          } else if (values.password !== values.confirmpassword) {
            errors.confirmpassword = "Passwords do not match";
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="register__form">
            <label className="form-label">Enter your email</label>
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
            <label className="form-label">Enter your password</label>
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
              validate={validatePassword}
            />
            <label className="form-label">Confirm your password</label>
            <Field
              className="input-field"
              name="confirmpassword"
              render={({ input, meta }) => (
                <React.Fragment>
                  {meta.error && meta.touched && (
                    <span className="Error">{meta.error}</span>
                  )}
                  <input {...input} type="password" />
                </React.Fragment>
              )}
            />
            <label className="form-label">Pick up a username</label>
            <Field
              className="input-field"
              name="username"
              render={({ input, meta }) => (
                <React.Fragment>
                  {meta.error && meta.touched && (
                    <span className="Error">{meta.error}</span>
                  )}
                  <input {...input} type="text" />
                </React.Fragment>
              )}
            />
            <Button btntype="submit" disabled={submitting || pristine}>
              Register
            </Button>
          </form>
        )}
      />
    </div>
  );
};
Register.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default withRouter(Register);
