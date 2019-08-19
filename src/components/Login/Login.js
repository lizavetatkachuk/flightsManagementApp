import React, { Fragment } from "react";
import { Form, Field } from "react-final-form";
import { Link, withRouter } from "react-router-dom";
import { validate } from "../../validators";
import "./login.scss";

const Login = props => {
  const onSubmit = () => {};
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
            <button className="login__form__submit" type="submit">
              Log In
            </button>
          </Fragment>
        )}
      />
      <div className="sign-up">
        <label>Do not have an account yet?</label>
        <Link to="/register" className="sign-up__button button" type="button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};
export default withRouter(Login);
