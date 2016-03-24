'use strict';

var gulp = require('gulp');
var validatePipeline = require('./src/index.js');
//var testPipeline = require('pipeline-test-node')({ plugins: {
//  mocha: {
//    reporter: 'spec'
//  },
//  istanbul: {
//    reporters: ['text-summary'],
//    thresholds: {
//      global: 0
//    }
//  }
//}});

var validateConfig = {
  files: [
    '*.js',
    './src/*.js',
    './test/**/*.js'
  ],
  rules: {}
};

gulp.task('lint', function() {
  return gulp
    .src(validateConfig.files)
    .pipe(validatePipeline.validateJS(validateConfig.rules));
});

gulp.task('build', ['lint'], function() {
  //return gulp
  //  .src(['test/**/*.spec.js'], { read: false })
  //  .pipe(testPipeline.test());
});