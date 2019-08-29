import { LOGIN, LOGOUT, SET_USER } from "../action-types/flightsActionTypes";

const initialState = {
  user: {}
};

export const authorisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state };
    case LOGOUT:
      return { ...state, user: {} };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
