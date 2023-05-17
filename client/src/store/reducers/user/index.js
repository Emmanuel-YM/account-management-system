export const userDetails = (state = {}, action) => {
  const clone = { ...state };
  switch (action.type) {
    case "SET_USER_DETAILS":
      return { ...clone, user: action.payload };
    default:
      return state;
  }
};
