import { SET_DEPARTURE_TIME } from '../constants/ActionTypes';

export default function departureTime(state = null, action) {
  switch (action.type) {
  case SET_DEPARTURE_TIME:
    return action.departureTime;
  default:
    return state;
  }
}