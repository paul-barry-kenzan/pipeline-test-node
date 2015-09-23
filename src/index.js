'use strict';

var mocha = require('gulp-mocha');
var handyman = require('pipeline-handyman');

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

  if (config) {
    config = handyman.updateConf(config, options);
  }

  gulp.task('pipelineTest', localTest);

  function localTest() {
    // handyman.log('Node test pipeline');
    return gulp.src(config.files, {read: false})
      .pipe(mocha(config.mochaConfig));
  }
};
