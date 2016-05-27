import { UPDATE_SCHEDULE_DATA } from '../constants/ActionTypes';

export default function scheduleData(state = [], action) {
  switch (action.type) {
  case UPDATE_SCHEDULE_DATA:
    return action.scheduleData;
  default:
    return state;
  }
}