import React, { Fragment } from "react";
import { Form, Field } from "react-final-form";
import { validate, onSubmit } from "../../validators";
import "./../Login/login.scss";
class Register extends React.Component {
  render() {
    return (
      <div className="register">
        <Form
          className="register__form"
          onSubmit={onSubmit}
          validate={validate}
          render={() => (
            <Fragment>
              <label>Enter your email</label>
              <Field
                className="input-field"
                name="email"
                component="input"
                type="text"
              />
              <label>Enter your password</label>
              <Field
                className="input-field"
                name="password"
                component="input"
                type="text"
              />
              <label>Confirm your password</label>
              <Field
                className="input-field"
                name="password-confirmation"
                component="input"
                type="text"
              />
              <label>Pick up a username</label>
              <Field
                className="input-field"
                name="username"
                component="input"
                type="text"
              />
              <button className="register__form__submit" type="submit">
                Register
              </button>
            </Fragment>
          )}
        />
      </div>
    );
  }
}
export default Register;
