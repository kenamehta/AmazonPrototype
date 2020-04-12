import { USERTYPE } from "../action/actionType";

const getType = (state = "customer", action) => {
  switch (action.type) {
    case USERTYPE:
      return action.newState;
    default:
      return state;
  }
};

export default getType;
