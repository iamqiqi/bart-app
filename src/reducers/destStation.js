import { SET_DEST_STATION } from '../constants/ActionTypes';

export default function destStation(state = null, action) {
  switch (action.type) {
  case SET_DEST_STATION:
    return action.destStation;
  default:
    return state;
  }
}