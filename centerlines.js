'use strict';
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var H = require('highland');
var R = require('ramda');
var JSONStream = require('JSONStream');

var files = [
  'manhattan',
  'brooklyn'
];

var writeObjects = function(writer, object, callback) {
  writer.writeObject(object, function(err) {
    callback(err);
  });
};

function streetName(feature) {
  return feature.properties.streetname
}

function convertFeatures(features) {
  var ids = features.map(function(f) {
    return f.properties.id;
  }).join(',');
  var id = crypto.createHash('md5').update(ids).digest('hex');
  var name = streetName(features[0]);

  return {
    type: 'pit',
    obj: {
      id: id,
      name: name,
      type: 'hg:Street',
      validSince: 1857,
      validUntil: 1862,
      geometry: {
        type: 'MultiLineString',
        coordinates: features.map(function(f) {
          return f.geometry.coordinates;
        })
      }
    }
  };
}

function convert(config, dir, writer, callback) {
  var streams = files
    .map(file => `./data/${file}.geojson`)
    .map(filename => fs.createReadStream(path.join(__dirname, filename))
      .pipe(JSONStream.parse('features.*')));

  // Some streets have no street name...
  //   For example, in Manhttan: 337, 940, 1106, 1394, 2058, 2662, 2702

  H(streams)
    .map(stream => H(stream))
    .merge()
    .filter(streetName)
    .group(streetName)
    .toArray(function(groupsArray) {
      var groups = groupsArray[0];
      H(R.values(groups))
        .map(convertFeatures)
        .compact()
        .map(H.curry(writeObjects, writer))
        .nfcall([])
        .series()
        .stopOnError(function(err) {
          callback(err);
        })
        .done(function() {
          callback();
        });
    });
}

// ==================================== API ====================================

module.exports.steps = [
  convert
];
