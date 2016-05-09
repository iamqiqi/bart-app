import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Trainline from '../components/Trainline';
import CarsTimeToggle from '../components/CarsTimeToggle';
import DirectionFilters from '../components/DirectionFilters';
import DevTools from './DevTools';

import '../sass/App.scss';

export default class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="row customize-views">
          <DirectionFilters />
          <CarsTimeToggle />
        </div>
        <Trainline />
        { false && __DEVTOOLS__ && typeof window.devToolsExtension === 'undefined' && <DevTools />}
      </div>
    );
  }
}

function select(state) {
  return {};
}

export default connect(select)(App);
