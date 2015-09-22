'use strict';

var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');
var helper = require('../src/resources.js');
var PluginError = plugins.util.PluginError;

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
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failOnError());

  }

};
