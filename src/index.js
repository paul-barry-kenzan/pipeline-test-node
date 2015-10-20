'use strict';

var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var mocha = require('gulp-mocha');

var config = {
  plugins: {
    mocha: {
      reporter: 'mocha-junit-reporter',
      reporterOptions: {
        mochaFile: './reports/test-results.xml'
      }
    }
  }
};

module.exports = testPipeline;

function testPipeline(options) {

  if (config) {
    config = handyman.updateConf(config, options);
  }

  var pipeline = {
    test: nodeTest()
  };

  return pipeline;

  function nodeTest() {
    handyman.log('Running mocha tests');

    return lazypipe()
      .pipe(mocha, config.plugins.mocha);
  }
}