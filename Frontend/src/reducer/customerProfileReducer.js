import {
  GETPROFILE,
  UPDATEPROFILE,
  UPDATEPROFILEPIC
} from "../action/customerProfileAction/actionType";

const initialState = {
  profiledata: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETPROFILE:
      return {
        ...state,
        profiledata: action.payload
      };
    case UPDATEPROFILE:
      console.log(state);
      return {
        ...state,
        profiledata: {
          ...state.profiledata,
          data: {
            ...state.profiledata.data,
            mainCustomer: {
              ...state.profiledata.data.mainCustomer,
              name: action.payload.data.name,
              city: action.payload.data.city,
              state: action.payload.data.state
            }
          }
        }
      };
    case UPDATEPROFILEPIC:
      return {
        ...state,
        profiledata: {
          ...state.profiledata,
          data: {
            ...state.profiledata.data,
            mainCustomer: {
              ...state.profiledata.data.mainCustomer,
              profilePictureUrl: action.payload.profilePictureUrl
            }
          }
        }
      };

    default:
      return state;
  }
}
