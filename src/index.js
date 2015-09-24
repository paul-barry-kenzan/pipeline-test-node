'use strict';

var plugins = require('gulp-load-plugins')({lazy: true});
var handyman = require('pipeline-handyman');
var PluginError = plugins.util.PluginError;

var config = {
  files: [
    'test/*.js',
    'test/**/*.js'
  ],
  mochaConfig: {
    reporter: 'List'
  }
};

module.exports = function (gulp, options) {

  if (!gulp) {
    throw new PluginError('pipe', 'Missing gulp option');
  }

  if (config) {
    config = handyman.updateConf(config, options);
  }

  gulp.task('pipelineTest', localTest);

  function localTest() {
    handyman.log('Node test pipeline');
    return gulp.src(config.files, {read: false})
      .pipe(plugins.mocha(config.mochaConfig));
  }
};
