import { UPDATE_STATION_LIST_DATA } from '../constants/ActionTypes';

export default function stationListData(state = {}, action) {
  switch (action.type) {
  case UPDATE_STATION_LIST_DATA:
    return action.stationListData;
  default:
    return state;
  }
}
