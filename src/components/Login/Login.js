import React from "react";
import { Form, Field } from "react-final-form";
import { validate, onSubmit } from "../../validators";
import Button from "./../Shared/Button/Button";
import "./login.scss";

const Login = () => (
  <form className="login">
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={() => (
        <form className="login__form">
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
          <Button
            props={{
              type: "submit",
              className: "form-submit-btn",
              title: " Log In"
            }}
          />
        </form>
      )}
    />
    <div className="sign-up">
      <label>Do not have an account yet?</label>
      <Button
        props={{
          type: "button",
          className: "register-switch-btn",
          title: " Sign Up"
        }}
      />
    </div>
  </form>
);

export default Login;
