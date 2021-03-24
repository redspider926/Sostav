import {combineReducers} from 'redux';

import auth from './auth';
import teams from './teams';
import events from './events';
import whipRounds from './whipRounds';

export default combineReducers({
  auth,
  teams,
  events,
  whipRounds,
});
