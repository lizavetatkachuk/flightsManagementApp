import React from "react";
import { Form, Field } from "react-final-form";
import { Link, withRouter } from "react-router-dom";
import { validate } from "../../validators";
import Button from "./../Shared/Button/Button";
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
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="login__form">
            <label className="form-label">Login</label>
            <Field
              className="input-field"
              name="login"
              component="input"
              type="text"
              placeholder="Enter your login"
            />
            <label className="form-label">Password</label>
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
        <label className="form-label">Do not have an account yet?</label>
        <Link to="/register">
          <Button
            props={{
              type: "button",
              className: "register-switch-btn",
              title: " Sign Up"
            }}
          />
        </Link>
      </div>
    </div>
  );
};
export default withRouter(Login);
