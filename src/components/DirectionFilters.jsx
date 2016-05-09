import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';

export default class DirectionFilters extends Component {

  render() {
    const { currentStation, actions, stationListData, directionFilter } = this.props;

    return (
      <div className="col-sm-8 bound-section">
        <div className="btn-group btn-group-sm" role="group">
          <button className="btn bound all" onClick={()=> { actions.setDirectionFilter("All") }}>All</button>
          <button className="btn bound northbound" onClick={()=> { actions.setDirectionFilter("North") }}>Northbound</button>
          <button className="btn bound southbound" onClick={()=> { actions.setDirectionFilter("South") }}>Southbound</button>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    stationListData: state.stationListData,
    currentStation: state.currentStation,
    directionFilter: state.directionFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(DirectionFilters);