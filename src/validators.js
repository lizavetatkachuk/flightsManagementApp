const validatePassword = value => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return (
    !pattern.test(value) &&
    "Should be from 6 to 20 characters with 1 digit, uppercase and lowercase letter"
  );
};

const mustBeEmail = value => {
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const pattern2 = /^.{1,}$/;
  if (!pattern2.test(value)) {
    return "Required";
  } else return !pattern.test(value) && "Email is invalid";
};

const minLength = value => {
  const pattern = /^.{6,}$/;
  return !pattern.test(value) && "The password is too short";
};

const validateDate = value => {
  const msg = value === "Invalid date" ? "Invalid date" : null;
  return msg;
};

export { validatePassword, mustBeEmail, minLength, validateDate };
