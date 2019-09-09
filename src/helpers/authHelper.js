import jwt_Decode from "jwt-decode";
export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
export const setToken = token => {
  localStorage.setItem("token", token);
};
export const removeToken = () => {
  localStorage.removeItem("token");
};
export const checkAdmin = () => {
  try {
    const token = getToken();
    if (!!token) {
      const decoded = jwt_Decode(token);
      return decoded.userRole;
    } else return null;
  } catch (err) {
    console.log(err);
  }
};
