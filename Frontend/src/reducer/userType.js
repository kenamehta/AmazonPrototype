const getType = (state = "customer", action) => {
  switch (action.type) {
    case "userType":
      return action.newState;
    default:
      return state;
  }
};

export default getType;
