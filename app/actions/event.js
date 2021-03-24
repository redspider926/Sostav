import * as actionTypes from './actionTypes';

export function getEvents(events) {
  return {
    type: actionTypes.GET_EVENTS,
    payload: events,
  };
}
