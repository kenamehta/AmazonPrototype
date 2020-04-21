import {
  GET_CATEGORYS,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORYS_LOADING,
} from "./../../action/admin/types.js";
const initialSate = {
  categorys: [],
  loading: false,
};

export default function (state = initialSate, action) {
  switch (action.type) {
    case GET_CATEGORYS:
      return {
        ...state,
        categorys: action.payload,
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categorys: state.categorys.filter(
          (category) => category._id != action.payload
        ),
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categorys: [action.payload, ...state.categorys],
      };
    case CATEGORYS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
