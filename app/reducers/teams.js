import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const teams = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_TEAMS:
      return action.payload;

    default:
      return state;
  }
};

export default teams;
