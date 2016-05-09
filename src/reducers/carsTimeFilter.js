import { SET_CARS_TIME_FILTER, CARS_TIME_VISIBILITY_FILTERS } from '../constants/ActionTypes';

export default function carsTimeFilter(state = 'SHOW_TIME', action) {
  switch (action.type) {
  case SET_CARS_TIME_FILTER:
    return action.carsOrTime;
  default:
    return state;
  }
}