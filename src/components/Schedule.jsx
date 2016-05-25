import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';

export default class Schedule extends Component {
  render() {

    const { stationListData, currentStation, destStation, actions } = this.props;

    let selectElement;

    return (
      <div className="schedule row">
        <div className="col-sm-6">
          destination: 
          <select className="form-control" ref={(elem) => { selectElement = elem }} onChange={()=> { actions.setDestStation(selectElement.value) }}>
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
              return <option key={ stationAbbr } value={ stationAbbr }>{ stationListData[stationAbbr].name }</option>
            })}
          </select>
        </div>
        <div className="col-sm-6">
          departure time
          <select className="form-control" ref={(elem) => { selectElement = elem }} onChange={()=> { actions.setDestStation(selectElement.value) }}>
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
              return <option key={ stationAbbr } value={ stationAbbr }>{ stationListData[stationAbbr].name }</option>
            })}
          </select>
        </div>
        <div>
          estimated arrival time:
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    stationListData: state.stationListData,
    currentStation: state.currentStation,
    destStation: state.destStation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(Schedule);