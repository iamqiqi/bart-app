import { combineReducers } from 'redux';
import stationListData from './stationListData';
import currentStation from './currentStation';
import destStation from './destStation';
import carsTimeFilter from './carsTimeFilter';
import directionFilter from './directionFilter';
import lineFilter from './lineFilter';
import departureTime from './departureTime';
import scheduleData from './scheduleData';

const rootReducer = combineReducers({
  stationListData,
  currentStation,
  carsTimeFilter,
  directionFilter,
  lineFilter,
  destStation,
  departureTime,
  scheduleData,
});

export default rootReducer;
