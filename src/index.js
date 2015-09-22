'use strict';

var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');
var helper = require('../src/resources.js');
var PluginError = $.util.PluginError;

var config = {
  files: [
    '*.js',
    'src/*.js',
    'src/**/*.js'
  ],
  disableJSCS: false,
  linter: 'JSHint'
};

var jsHintConfig = resolveConfigFile('.jshintrc');
var jscsConfig = resolveConfigFile('.jscsrc');

function resolveConfigFile(fileName) {
  var configFile;
  if (existsSync(process.cwd() + '/' + fileName)) {
    configFile = process.cwd() + '/' + fileName;
  } else if (existsSync(__dirname + '/' + fileName)) {
    configFile = __dirname + '/' + fileName;
  } else {
    // If the file isn't found, it uses the default configurations.
    return;
  }

  return configFile;

}

function existsSync(filename) {
  try {
    fs.accessSync(filename);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = function (gulp, options) {

  if (!gulp) {
    throw new PluginError('pipe', 'Missing gulp option');
  }

  if (options) {
    config = helper.updateConf(config, options);
  }

  gulp.task('pipelineValidateJS', validateJS);

  if (config.linter === 'ESLint') {
    gulp.task('pipelineValidateJS', validateES);
  }

  function jsValidationCombiner() {

    return $.piece(
      $.jshint(jsHintConfig),
      $.if(!config.disableJSCS, $.jscs(jscsConfig))
    );
  }

  function validateJS() {
    helper.log('Validating js with JSHint');
    return gulp
      .src(config.files)
      .pipe($.if(args.verbose, $.print()))
      .pipe(jsValidationCombiner())
      .pipe($.if(!config.disableJSCS, $.jscsStylish.combineWithHintResults()))
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.jshint.reporter('fail'));
  }

  function validateES() {
    helper.log('Validating js with ESlint');
    return gulp
      .src(config.files)
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failOnError());

  }

};
