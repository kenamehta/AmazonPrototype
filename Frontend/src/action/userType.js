import { USERTYPE } from "./actionType";

export const userType = (x) => {
  return {
    type: "userType",
    newState: x,
  };
};
