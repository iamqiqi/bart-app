import { SET_DIRECTION_FILTER, DirectionVisibilityFilters } from '../constants/ActionTypes';

export default function directionFilter(state = 'All', action) {
  switch (action.type) {
  case SET_DIRECTION_FILTER:
    return action.direction;
  default:
    return state;
  }
}