const validatePassword = (values = {}) => {
  const { password } = values;
  var regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const errorMsg = password.match(regexp)
    ? null
    : "The passwords should contain from 6 to 20 characters which, at least one numeric digit, one uppercase and one lowercase letter";
  console.log(errorMsg);
  return errorMsg;
};
const validatePasswordConfirmation = (values = {}) => {
  const { password, confirmpassword } = values;
  const errorMsg =
    password === confirmpassword ? null : "The passwords do not match";
  console.log(errorMsg);
  return errorMsg;
};
export { validatePassword, validatePasswordConfirmation };
