import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';

export default class Header extends Component {
  render() {

    const { currentStation, actions, stationListData } = this.props;

    let stationName = 'Loading...';
    if (stationListData[currentStation]) {
      stationName = stationListData[currentStation].name;
    }

    let selectElement;

    return (
      <div className="station-wrapper">
        <div className="station-name">
          { stationName }
        </div>
        <select value={currentStation || ""} className="select-station form-control" ref={(elem) => { selectElement = elem }} onChange={()=> {actions.setCurrentStation(selectElement.value) }}>
          <option>--select--</option>
          {Object.keys(stationListData).sort((a, b) => {
              if (stationListData[a].name < stationListData[b].name) {
                return -1;
              }
              if (stationListData[a].name > stationListData[b].name) {
                return 1;
              }
              // a must be equal to b
              return 0;
          }).map((stationAbbr) => {
            return <option key={stationAbbr} value={ stationAbbr }>{ stationListData[stationAbbr].name }</option>
          })}
        </select>
      </div>
    );
  }
}

function select(state) {
  return {
    stationListData: state.stationListData,
    currentStation: state.currentStation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(Header);