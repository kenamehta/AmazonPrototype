import {
  SELLERPROFILE,
  SELLERUPDATEPROFILEPICTURE,
  SELLERUPDATEPROFILE
} from "../action/Seller/Profile/actionType";

const initialState = {
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELLERPROFILE:
      return {
        ...state,
        user: action.payload
      };
    case SELLERUPDATEPROFILEPICTURE:
      return {
        ...state,
        user: {
          ...state.user,
          profilePictureUrl: action.payload
        }
      };
    case SELLERUPDATEPROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    default:
      return state;
  }
}
