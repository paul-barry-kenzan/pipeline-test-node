'use strict';

var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});

var config = {
  mochaConfig: {
    reporter: 'List'
  }
};

module.exports = testPipeline;

function testPipeline(options) {

  if (config) {
    config = handyman.updateConf(config, options);
  }

  var pipeline = {
    test: localTest()
  };

  return pipeline;

  function localTest() {
    handyman.log('Node test pipeline');
    return lazypipe()
      .pipe(plugins.mocha, config.mochaConfig);
  }
}
