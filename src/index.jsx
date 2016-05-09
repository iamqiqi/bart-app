'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';

import configureStore from './store/configureStore';

import { updateStationListData, setCurrentStation } from './actions/bart';

import { getBART, processBART, getGPSStation, getLocation } from './helpers/bartApi';

const rootEl = document.getElementById('app');

const store = configureStore();

window.store = store;

getLocation((position) => {
  let defaultStation = getGPSStation(position);
  let action = setCurrentStation(defaultStation);
  store.dispatch(action);
});

const refresh = function () {
  getBART((xml) => {
    let stationListData = processBART(xml);
    let action = updateStationListData(stationListData);
    store.dispatch(action);
    setTimeout(refresh, 10000);
  });
};

refresh();

ReactDOM.render(
  <Root store={store} />,
  rootEl
);