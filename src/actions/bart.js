import * as types from '../constants/ActionTypes';

export function updateStationListData(stationListData) {
  return {
    type: types.UPDATE_STATION_LIST_DATA,
    stationListData,
  };
}

export function setCurrentStation(station) {
  return {
    type: types.SET_CURRENT_STATION,
    station,
  };
}

export function setDirectionFilter(direction) {
  return {
    type: types.SET_DIRECTION_FILTER,
    direction,
  };
}

export function setLineFilter(line) {
  return {
    type: types.SET_LINE_FILTER,
    line,
  };
}

export function setCarsTimeFilter(carsOrTime) {
  return {
    type: types.SET_CARS_TIME_FILTER,
    carsOrTime,
  };
}

