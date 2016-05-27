/* global $ */
/* global navigator */
import StationLocations from '../constants/StationLocations';

let uniqueId = 0;

const BARTApi = 'MW9S-E7SL-26DU-VV8V';

export function getBART(callback) {
  $.get('https://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=' + BARTApi + '&callback=?', function(xml) {
    callback(xml);
  });
}

export function getSchedule(orig, dest, callback) {
  $.get('//api.bart.gov/api/sched.aspx?cmd=depart&orig='+ orig + '&dest=' + dest + '&key=' + BARTApi + '&callback=?', function(xml) {
    callback(xml);
  });
}

export function processSchedule(xml) {
  var data = $.xml2json(xml);

  var scheduleArray = [];
  //var day = new Date();

  data.schedule.request.trip.forEach(function(schedule) {
    // process departure time
    // var origTime = schedule.leg.origTimeMin.split(':');
    // var origDate = schedule.leg.origTimeDate.split('/');
    // var origHours;
    // var origMins = parseInt(origTime[1].slice(0,-3));
    // if ((origTime[1].slice(-2) === 'PM') && (origTime[0] !== '12')) {
    //   origHours = parseInt(origTime[0]) + 12;
    // } else {
    //   origHours = parseInt(origTime[0]);
    // }
    // var departureTime = new Date(parseInt(origDate[2]), parseInt(origDate[0])-1, parseInt(origDate[1]), origHours, origMins);

    // // process destination time
    // var destTime = schedule.leg.destTimeMin.split(':');
    // var destDate = schedule.leg.destTimeDate.split('/');
    // var destHours;
    // var destMins = parseInt(destTime[1].slice(0,-3));
    // if ((destTime[1].slice(-2) === 'PM') && (destTime[0] !== '12')) {
    //   destHours = parseInt(destTime[0]) + 12;
    // } else {
    //   destHours = parseInt(destTime[0]);
    // }
    // var arrivalTime = new Date(parseInt(destDate[2]), parseInt(destDate[0])-1, parseInt(destDate[1]), destHours, destMins);

    scheduleArray.push({
      departure: schedule.leg.origTimeMin,
      arrival: schedule.leg.destTimeMin
    });
  });
  return scheduleArray;
}

export function processBART(xml) {
  //parse XML
  var stations = {};

  var data = $.xml2json(xml);

  data.station.forEach(function(station) {
    stations[station.abbr] = {
      "abbr": station.abbr,
      "name": station.name,
      "lines": {}
    };

    if (!(station.etd instanceof Array)) {
      station.etd = [ station.etd ];
    }
    station.etd.forEach(function(destination) {
      stations[station.abbr].lines[destination.abbreviation] = {
        "abbr": destination.abbreviation,
        "name": destination.destination,
        "color": "",
        "direction": "",
        "trains": []
      };

      if (! (destination.estimate instanceof Array)) {
        if (destination.estimate !== null)
          destination.estimate = [ destination.estimate ];
      }

      destination.estimate.forEach(function(estimate) {
          var train = {
            "time": estimate.minutes,
            "carCount": estimate.length,
            "id": uniqueId++,
          };
          stations[station.abbr].lines[destination.abbreviation].trains.push(train);
          if (stations[station.abbr].lines[destination.abbreviation].color === "") {
            stations[station.abbr].lines[destination.abbreviation].color = estimate.color;
            stations[station.abbr].lines[destination.abbreviation].direction = estimate.direction;
          }
      });
    });
  });

  // TODO: dispatch action

  return stations;
}

export function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  }
}

export function getGPSStation(position) {
  var clat = position.coords.latitude;
  var clng = position.coords.longitude;
  var stationAbbr = "";
  var shortest = Infinity;
  for (var station in StationLocations) {
    var slat = StationLocations[station]["lat"];
    var slng = StationLocations[station]["lng"];
    var dlat = clat - slat;
    var dlng = clng - slng;
    var distance = (dlat*dlat)+(dlng*dlng);
    if (shortest > distance) {
      shortest = distance;
      stationAbbr = station;
    }
  }
  return stationAbbr;
}