/* global $ */
/* global navigator */
import StationLocations from '../constants/StationLocations';

let uniqueId = 0;

export function getBART(callback) {
  var BARTApi = 'MW9S-E7SL-26DU-VV8V';
  $.get('http://api.bart.gov/api/etd.aspx?cmd=etd&orig=ALL&key=' + BARTApi + '&callback=?', function(xml) {
    callback(xml);
  });
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