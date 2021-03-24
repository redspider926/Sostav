import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const events = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_EVENTS:
      return action.payload;

    default:
      return state;
  }
};

export default events;
