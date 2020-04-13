import { SELLERPROFILE, UPDATEPROFILEPICTURE, UPDATEPROFILE } from './../action/UserAction/actionTypes';

const initialState = { 
  user: {}
 };

export default function (state = initialState, action) {
  switch(action.type){
    case SELLERPROFILE:
      return {
        ...state,
        user: action.payload
      }
    case UPDATEPROFILEPICTURE:
        return {
          ...state,
          user: {
            ...state.user,
            profilePictureUrl:action.payload
          }
        }
    case UPDATEPROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
      default:
        return state;
  }
}