'use strict';

var gulp = require('gulp');
require('pipeline-validate-js')(gulp);
require('./src/index.js')(gulp);

//Validates pipeline files.
gulp.task('default', ['pipelineTest']);
