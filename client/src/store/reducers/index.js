import { combineReducers } from "redux";
import { userName } from "./auth";
import { userDetails } from "./user";

export default combineReducers({
  userName,
  userDetails,
});
