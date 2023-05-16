export const setUserData = (payload) => ({
  type: "SET_USER_DATA",
  payload,
});

export const setData = (data) => async (dispatch) => {
  try {
    dispatch(setUserData(data));
  } catch (error) {
    console.log("Error: ", error);
  }
};
