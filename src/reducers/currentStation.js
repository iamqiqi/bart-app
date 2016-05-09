import { SET_CURRENT_STATION } from '../constants/ActionTypes';

export default function currentStation(state = null, action) {
  switch (action.type) {
  case SET_CURRENT_STATION:
    return action.station;
  default:
    return state;
  }
}
