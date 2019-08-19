import React, { Fragment } from "react";
import { Form, Field } from "react-final-form";
import { withRouter } from "react-router-dom";
import { validate } from "../../validators";
import "./../Login/login.scss";

const Register = props => {
  const onSubmit = values => {
    console.log(`Form values: ${JSON.stringify(values, null, 4)}`);
    props.history.push("/login");
  };
  return (
    <div className="register">
      <Form
        className="register__form"
        onSubmit={onSubmit}
        //validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
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
          </form>
        )}
      />
    </div>
  );
};
export default withRouter(Register);
