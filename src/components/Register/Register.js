import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Field } from "react-final-form";
import { withRouter } from "react-router-dom";
import bcrypt from "bcryptjs";
import { requestRegister } from "./../../redux/actions/registration";
import Button from "./../Shared/Button/Button";
import { mustBeEmail, validatePassword } from "./../../validators";
import "./../Login/login.scss";

const Register = props => {
  const { history, requestRegister, register } = props;

  const onSubmit = values => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(values.password, salt, function(err, hash) {
        requestRegister({ ...values, password: hash, history });
      });
    });
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
          if (!values.name) {
            errors.name = "Required";
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
            {register.error ? (
              <p className="server-error">This email is already in use</p>
            ) : null}
            <label className="form-label">Enter your email</label>
            <Field
              name="email"
              render={({ input, meta }) => (
                <div className='field'>
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
                  <input className="input-field" {...input} />
                </div>
              )}
              validate={mustBeEmail}
            />
            <label className="form-label">Enter your password</label>
            <Field
              name="password"
              render={({ input, meta }) => (
                <div className='field'>
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
                  <input className="input-field" {...input} type="password" />
                </div>
              )}
              validate={validatePassword}
            />
            <label className="form-label">Confirm your password</label>
            <Field
              name="confirmpassword"
              render={({ input, meta }) => (
                <div className='field'>
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
                  <input className="input-field" {...input} type="password" />
                </div>
              )}
            />
            <label className="form-label">Pick up a username</label>
            <Field
              name="name"
              render={({ input, meta }) => (
                <div className='field'>
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
                  <input className="input-field" {...input} type="text" />
                </div>
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
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestRegister
    },
    dispatch
  );
const mapStateToProps = state => {
  return { register: state.register };
};
Register.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
