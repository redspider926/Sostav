import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const whipRounds = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_WHIPROUNDS:
      return action.payload;

    default:
      return state;
  }
};

export default whipRounds;
