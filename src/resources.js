'use strict';

// TODO Move this module to its own repo.

var _ = require('lodash');
var glp = require('gulp-load-plugins')({lazy: true});

module.exports = {

  updateConf: updateConfiguration,
  log: log
};

function updateConfiguration(config, newConfig) {
  return _.merge({}, config, newConfig, replaceArrays);
}

function replaceArrays(a, b) {
  if (_.isArray(a)) {
    return b;
  }
}

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        glp.util.log(glp.util.colors.blue(msg[item]));
      }
    }
  } else {
    glp.util.log(glp.util.colors.blue(msg));
  }
}
