import { combineReducers } from 'redux';
import stationListData from './stationListData';
import currentStation from './currentStation';
import carsTimeFilter from './carsTimeFilter';
import directionFilter from './directionFilter';
import lineFilter from './lineFilter';

const rootReducer = combineReducers({
  stationListData,
  currentStation,
  carsTimeFilter,
  directionFilter,
  lineFilter,
});

export default rootReducer;
