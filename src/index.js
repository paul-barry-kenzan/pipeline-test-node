'use strict';

var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});

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
    return lazypipe()
      .pipe(plugins.mocha, config.plugins.mocha);
  }
}
