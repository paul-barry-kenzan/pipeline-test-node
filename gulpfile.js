'use strict';

var gulp = require('gulp');
require('./src/index.js')(gulp);
require('pipeline-validate-js')(gulp);

// TODO Update tasks after improving validate-js.

gulp.task('default', ['pipelineValidateJS', 'pipelineTest']);
