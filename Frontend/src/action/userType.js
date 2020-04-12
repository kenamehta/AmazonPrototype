import { USERTYPE } from "./actionType";

export const userType = x => {
  return {
    type: USERTYPE,
    newState: x
  };
};
