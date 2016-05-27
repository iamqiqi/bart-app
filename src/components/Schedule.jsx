import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';
import { getSchedule, processSchedule } from '../helpers/bartApi';

export default class Schedule extends Component {
  render() {

    const { stationListData, currentStation, destStation, departureTime, scheduleData, actions } = this.props;

    let departureTimes = [];

    // if (destStation) {
    //   departureTimes = [{departure: '2am', arrival: '3am'},{departure: '4am', arrival: '5am'}]
    // }

    let destSelectElement, departureSelectElement;

    return (
      <div className="schedule row">
        <div className="col-sm-6">
          destination: 
          <select className="form-control" ref={(elem) => { destSelectElement = elem }} onChange={()=> {
              if (currentStation && destSelectElement.value ) {
                var schedule = getSchedule( currentStation, destSelectElement.value, (xml) => {
                  let schedule = processSchedule(xml);
                  actions.setDestStation(destSelectElement.value);
                  actions.updateScheduleData(schedule);
                });
              }
            }
          }>
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
          estimated arrival time
          <select className="form-control" ref={(elem) => { departureSelectElement = elem }}
          >
            <option>--select--</option>
            { scheduleData.map(({departure, arrival}) => {
                return <option key={ departure + arrival } value={ departure + arrival }>{departure} - {arrival}</option>
              })
              
            }
          </select>
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
    scheduleData: state.scheduleData,
    departureTime: state.departureTime,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(Schedule);