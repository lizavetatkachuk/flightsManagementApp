const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_FLIGHTS":
      return { ...state, values: action.payload };
    case "UPDATE_FLIGHTS":
      return { ...state, flights: action.flights };
    default:
      return state;
  }
};
export default rootReducer;
