'use strict';

var gulp = require('gulp');
var handyman = require('pipeline-handyman');
var istanbul = require('gulp-istanbul');
var lazypipe = require('lazypipe');
var mocha = require('gulp-mocha');

var config = {
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
        global: 90
      }
    }
  }
};

module.exports = testPipeline;

function testPipeline(options) {

  options = options || {};
  config = handyman.mergeConf(config, options);

  var pipeline = {
    test: nodeTest()
  };

  return pipeline;

  function nodeCoverage() {

    return gulp.src(config.files.src)
      // Covering files
      .pipe(istanbul())
      // Force `require` to return covered files
      .pipe(istanbul.hookRequire())
      // Write the covered files to a temporary directory
      .pipe(gulp.dest('./reports/'));
  }

  function nodeTest() {
    handyman.log('Running mocha tests');

    nodeCoverage();

    return lazypipe()
      .pipe(mocha, config.plugins.mocha)
      .pipe(istanbul.writeReports)
      .pipe(istanbul.enforceThresholds, config.plugins.istanbul);
  }
}