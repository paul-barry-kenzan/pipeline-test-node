'use strict';

var handyman = require('pipeline-handyman');
var istanbul = require('gulp-istanbul');
var lazypipe = require('lazypipe');
var mocha = require('gulp-mocha');

var defaultConfig = {
  files: {
    src: ['./src/*.js']
  },
  plugins: {
    mocha: {
      reporter: 'mocha-junit-reporter',
      reporterOptions: {
        mochaFile: './reports/test-results/test-results.xml'
      }
    },
    istanbul: {
      writeReports: {
        dir: './reports/',
        reporters: ['json', 'text-summary', 'cobertura'],
        reportOpts: {
          dir: './reports'
        }
      },
      thresholds: {
        global: 80
      }
    }
  }
};

module.exports = {
  pipelineFactory: pipelineFactory,
  test: function(options) {
    var config;
    var stream;

    options = options || {};
    config = handyman.mergeConf(defaultConfig, options);

    stream = pipelineFactory(config);
    stream.config = config;
    return stream;
  },
  coverage: function() {
    return lazypipe()
      .pipe(istanbul)
      .pipe(istanbul.hookRequire);
  }
};

function pipelineFactory(config) {
  return lazypipe()
    .pipe(mocha, config.plugins.mocha)
    .pipe(istanbul.writeReports, config.plugins.istanbul.writeReports)
    .pipe(istanbul.enforceThresholds, config.plugins.istanbul);
}