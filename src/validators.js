const validatePassword = value => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return (
    !pattern.test(value) &&
    "The passwords should contain from 6 to 20 characters which, at least one numeric digit, one uppercase and one lowercase letter"
  );
};
// const validatePasswordConfirmation = value => {
//   const { password, confirmpassword } = value;
//   const errorMsg =
//     password === confirmpassword ? null : "The passwords do not match";
//   console.log(errorMsg);
//   return errorMsg;
// };
const mustBeEmail = value => {
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return !pattern.test(value) && "Email is invalid";
};

export { validatePassword, mustBeEmail };
