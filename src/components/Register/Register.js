import React, { Fragment } from "react";
import { Form, Field } from "react-final-form";
import { withRouter } from "react-router-dom";
import { validate } from "../../validators";
import Button from "./../Shared/Button/Button";
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
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="register__form">
            <label className="form-label">Enter your email</label>
            <Field
              className="input-field"
              name="email"
              component="input"
              type="text"
            />
            <label className="form-label">Enter your password</label>
            <Field
              className="input-field"
              name="password"
              component="input"
              type="text"
            />
            <label className="form-label">Confirm your password</label>
            <Field
              className="input-field"
              name="password-confirmation"
              component="input"
              type="text"
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
export default withRouter(Register);
