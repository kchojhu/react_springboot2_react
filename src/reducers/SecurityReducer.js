import {SET_CURRENT_USER} from "../actions/Types";

const initialState = {
    user: {},
    validToken: false
};

const validateToken = payload => {
  if (payload) {
      return true;
  }
    return false;
};

export default (state=initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: validateToken(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
};