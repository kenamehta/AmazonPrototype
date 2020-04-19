import {
  GETPROFILE,
  UPDATEPROFILE,
  UPDATEPROFILEPIC,
  ADDADDRESS,
  DELETEADDRESS
} from "../action/customerprofileaction/actionType";

const initialState = {
  profiledata: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GETPROFILE:
      return {
        ...state,
        profiledata: action.payload,
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
              state: action.payload.data.state,
            },
          },
        },
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
              profilePictureUrl: action.payload.profilePictureUrl,
            },
          },
        },
      };

      case ADDADDRESS:
        return {
          ...state,
         addressArray:action.payload
        };

        case DELETEADDRESS:
        return {
          ...state,
         addressArray:action.payload
        };

    default:
      return state;
  }
}
