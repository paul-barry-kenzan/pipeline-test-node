'use strict';

var gulp = require('gulp'),
    validatePipeline = require('./src/index.js'),
    config = {
      files: [
        '*.js',
        './src/*.js',
        './src/**/*.js'
      ],
      rules: {
        'consistent-this': 0,
        'new-cap': 0,
        'no-cond-assign': 0,
        'newline-per-chained-call': 0
      }
    };

gulp.task('build', function() {
  return gulp
    .src(config.files)
    .pipe(validatePipeline.validateJS(config.rules));
});
