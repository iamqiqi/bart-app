import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bartActions from '../actions/bart';

export default class Trainline extends Component {
  lineClickHandler(line) {
    const { actions, lineFilter } = this.props;
    if (lineFilter === 'All')
      actions.setLineFilter(line);
    else
      actions.setLineFilter('All');
  }

  render() {
    const { currentStation, actions, stationListData, carsTimeFilter, directionFilter, lineFilter } = this.props;

    let stationInfo = 'Loading...';
    let lines = {};
    if (stationListData[currentStation]) {
      stationInfo = stationListData[currentStation];
      lines = stationInfo.lines;
    }

    return (
      <div className="train-lines">
        {Object.keys(lines).map((lineAbbr) => {
          return (
            (directionFilter === 'All' || directionFilter === lines[lineAbbr].direction) &&
            (lineFilter === 'All' || lineFilter === lines[lineAbbr].color) &&
            <div key={lines[lineAbbr].abbr} className="train-line" color={lines[lineAbbr].color} direction={lines[lineAbbr].direction}
              onClick={()=> this.lineClickHandler(lines[lineAbbr].color)}
            >
              <div className={`train-name ${lines[lineAbbr].color}`}>
                { lines[lineAbbr].name }
              </div>

              { carsTimeFilter === 'SHOW_TIME' && <div className="train-times">
                {lines[lineAbbr].trains.map((train) => {
                  if (isNaN(train.time))
                    return <div className="train-info train-time" key={train.id}>{ train.time }</div>;
                  else
                    return <div className="train-info train-time" key={train.id}>{ train.time } min</div>;
                })}
              </div> }

              { carsTimeFilter === 'SHOW_CARS' && <div className="train-cars">
                {lines[lineAbbr].trains.map((train) => {
                  return <div className="train-info train-car" key={train.id}>{ train.carCount } cars</div>;
                })}
              </div> }
            </div>
          )
        })}
      </div>
    );
  }
}

function select(state) {
  return {
    stationListData: state.stationListData,
    currentStation: state.currentStation,
    carsTimeFilter: state.carsTimeFilter,
    directionFilter: state.directionFilter,
    lineFilter: state.lineFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bartActions, dispatch),
  };
}

export default connect(select, mapDispatchToProps)(Trainline);