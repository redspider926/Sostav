import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  user: {},
  confirmation: null,
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        isAuth: true,
        user: action.payload,
      };
    case actionTypes.REGISTER:
      return {
        isAuth: true,
        user: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        isAuth: false,
      };
    case actionTypes.SET_CONFIRMATION:
      return {
        ...state,
        confirmation: action.payload,
      };
    // case actionTypes.SET_PHONENUMBER:
    //   return {
    //     ...state,
    //     phoneNumber: action.payload,
    //   };

    default:
      return state;
  }
};

export default auth;
