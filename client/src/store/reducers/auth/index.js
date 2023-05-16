export const userDetails = (state = {}, action) => {
  const clone = { ...state };
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...clone, details: action.payload };
    default:
      return state;
  }
};
