import axios from "axios";
export const setUserDetails = (payload) => ({
  type: "SET_USER_DETAILS",
  payload,
});

export const userDetailsAction = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/v1/user/userDetails");
    await dispatch(setUserDetails(response.data.user));
  } catch (error) {
    console.log("Error: ", error);
  }
};
