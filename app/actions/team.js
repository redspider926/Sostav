import * as actionTypes from './actionTypes';

export function getTeams(teams) {
  return {
    type: actionTypes.GET_TEAMS,
    payload: teams,
  };
}
