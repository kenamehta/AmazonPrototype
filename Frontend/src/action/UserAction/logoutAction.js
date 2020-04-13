import { LOGOUT } from "./actionTypes";

//logout action
export const logOut = payload => {
  localStorage.clear();
  console.log("Inside logout action");
  return {
    payload,
    type: LOGOUT
  };
};
