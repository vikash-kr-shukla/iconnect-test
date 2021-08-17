import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {error:''};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      }; 
    case CLEAR_ERRORS:
      return {
        ...state,
        error: action.payload
      }; 
    default:
      return state;
  }
}
