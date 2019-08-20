import React, { Fragment } from "react";
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
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="register__form">
            <label className="form-label">Enter your email</label>
            <Field
              className="input-field"
              name="email"
              component="input"
              type="email"
              render={({ input, meta }) => (
                <React.Fragment>
                  {meta.error && meta.touched && (
                    <span className="Error">{meta.error}</span>
                  )}
                  <input {...input} type="email" placeholder="email" />
                </React.Fragment>
              )}
              validate={mustBeEmail}
            />
            <label className="form-label">Enter your password</label>
            <Field
              className="input-field"
              name="password"
              component="input"
              type="password"
              render={({ input, meta }) => (
                <React.Fragment>
                  {meta.error && meta.touched && (
                    <span className="Error">{meta.error}</span>
                  )}
                  <input {...input} type="email" placeholder="email" />
                </React.Fragment>
              )}
              validate={validatePassword}
            />
            <label className="form-label">Confirm your password</label>
            <Field
              className="input-field"
              name="confirmpassword"
              component="input"
              type="password"
              render={({ input, meta }) => (
                <React.Fragment>
                  {meta.error && meta.touched && (
                    <span className="Error">{meta.error}</span>
                  )}
                  <input {...input} type="email" placeholder="email" />
                </React.Fragment>
              )}
            />
            <label className="form-label">Pick up a username</label>
            <Field
              className="input-field"
              name="username"
              component="input"
              type="text"
            />
            <Button type="submit">Register </Button>
          </form>
        )}
      />
    </div>
  );
};
Register.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
export default withRouter(Register);
