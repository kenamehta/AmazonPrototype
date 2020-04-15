import { GETPROFILE } from "../action/customerprofileaction/actionType";

const initialState = { 
    profiledata: {}
   };

  export default function (state = initialState, action) {
  switch(action.type){
    case GETPROFILE:
      return {
        ...state,
        profiledata: action.payload
      }
    
      default:
        return state;
  }
}