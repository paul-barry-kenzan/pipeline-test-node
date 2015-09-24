'use strict';

var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');
var helper = require('../src/resources.js');
var path = require('path');
var PluginError = plugins.util.PluginError;

var config = {
  files: [
    '*.js',
    'src/*.js',
    'src/**/*.js'
  ],
  disableJSCS: false,
  linter: 'JSHint',
  lintRules: [
    '../'
  ]
};
var jsHintConfig = resolveConfigFile('.jshintrc');
var jscsConfig = resolveConfigFile('.jscsrc');
var esLintConfig = resolveConfigFile('.eslintrc');

function resolveConfigFile(fileName) {
  var configFile;
  var configFilesPathUser = path.resolve(process.cwd(), fileName);
  var configFilesPathDefault = __dirname.substring(0, __dirname.lastIndexOf("/"));

  configFilesPathDefault = path.resolve(configFilesPathDefault, fileName);

  return existsSync(configFilesPathUser) ? configFilesPathUser : configFilesPathDefault

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

  switch (config.linter) {
    case 'ESLint':
      gulp.task('pipelineValidateJS', validateES);
      break;
    default:
      gulp.task('pipelineValidateJS', validateJS);
  }

  function jsValidationCombiner() {

    return plugins.piece(
      plugins.jshint(jsHintConfig),
      plugins.if(!config.disableJSCS, plugins.jscs(jscsConfig))
    );
  }

  function validateJS() {
    helper.log('Validating js with JSHint');
    return gulp
      .src(config.files)
      .pipe(plugins.if(args.verbose, plugins.print()))
      .pipe(jsValidationCombiner())
      .pipe(plugins.if(!config.disableJSCS, plugins.jscsStylish.combineWithHintResults()))
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
  }

  function validateES() {
    helper.log('Validating js with ESlint');
    return gulp
      .src(config.files)
      .pipe(plugins.eslint(esLintConfig))
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failOnError());

  }

};
