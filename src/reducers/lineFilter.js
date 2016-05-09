import { SET_LINE_FILTER } from '../constants/ActionTypes';

export default function lineFilter(state = 'All', action) {
  switch (action.type) {
  case SET_LINE_FILTER:
    return action.line;
  default:
    return state;
  }
}