import React, { Fragment } from "react";
import { Form, Field } from "react-final-form";
import { validate, onSubmit } from "../../validators";
import "./login.scss";
import { Link } from "react-router-dom";
class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <Form
          className="login__form"
          onSubmit={onSubmit}
          validate={validate}
          render={() => (
            <Fragment>
              <label>Login</label>
              <Field
                className="input-field"
                name="login"
                component="input"
                type="text"
                placeholder="Enter your login"
              />
              <label>Password</label>
              <Field
                className="input-field"
                name="password"
                component="input"
                type="text"
                placeholder="Enter your password"
              />
              <button className="login__form__submit">Log In</button>
            </Fragment>
          )}
        />
        <div className="sign-up">
          <label>Do not have an account yet?</label>
          <Link to="/register" className="sign-up__button button">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}
export default Login;
