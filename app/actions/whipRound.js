import * as actionTypes from './actionTypes';

export function getWhipRounds(whipRounds) {
  return {
    type: actionTypes.GET_WHIPROUNDS,
    payload: whipRounds,
  };
}
