'use strict';

var gulp = require('gulp');
require('./src/index.js')(gulp);

gulp.task('default', ['validate:js']);
