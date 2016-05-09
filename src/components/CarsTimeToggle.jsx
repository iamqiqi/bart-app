import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';
import { CarsTimeVisibilityFilters } from '../constants/VisibilityFilters';

const { SHOW_CARS, SHOW_TIME } = CarsTimeVisibilityFilters;

export default class CarsTimeToggle extends Component {
  handleClick() {
    const { actions, carsTimeFilter } = this.props;
    switch (carsTimeFilter) {
      case SHOW_TIME:
        actions.setCarsTimeFilter(SHOW_CARS);
        break;
      case SHOW_CARS:
        actions.setCarsTimeFilter(SHOW_TIME);
        break;
    }
  }

  render() {

    const { currentStation, actions, stationListData, carsTimeFilter } = this.props;

    let buttonText = carsTimeFilter === SHOW_TIME? 'show cars' : 'show time';

    return (
      <div className="col-sm-4 switch-section">
        <button className="switch-views-button btn"
                onClick={()=> { this.handleClick() }}>
          { buttonText }
        </button>
      </div>
    );
  }
}

function select(state) {
  return {
    stationListData: state.stationListData,
    currentStation: state.currentStation,
    carsTimeFilter: state.carsTimeFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(CarsTimeToggle);