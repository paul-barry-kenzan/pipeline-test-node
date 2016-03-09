'use strict';

var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');
var handyman = require('pipeline-handyman');
var path = require('path');
var lazypipe = require('lazypipe');

var config = {
  disableJSCS: false,
  linter: 'JSHint',
  reporter: {
    verbose: true
  }
};
var jsHintConfig = resolveConfigFile('.jshintrc');
var jscsConfig = resolveConfigFile('.jscsrc');
var esLintConfig = resolveConfigFile('.eslintrc');

module.exports = validatePipeline();

function validatePipeline () {
  var pipeline = {};

  pipeline.validateJS = function (options) {

    if (options) {
      config = handyman.mergeConf(config, options);

      switch (config.linter) {

        case 'ESLint':
          return validateES();

        default:
          handyman.log('Validating js with JSHInt and JSCS, Options not valid');
          return validateJSHint();
      }

    }else {
      return validateJSHint();
    }
  };

  return pipeline;
}

function validateJSHint() {
  handyman.log('Validating js with JSHInt and JSCS');
  var stream = lazypipe()
    .pipe(function() {
      return plugins.if(args.verbose, plugins.print());
    })
    .pipe(jsValidationCombiner)
    .pipe(function() {
      return plugins.if(!config.disableJSCS, plugins.jscsStylish.combineWithHintResults());
    })
    .pipe(plugins.jshint.reporter, 'jshint-stylish')
    .pipe(plugins.jshint.reporter, 'jshint-stylish', config.reporter)
    .pipe(plugins.jshint.reporter, 'fail');

  return stream();
}

function jsValidationCombiner() {

  return plugins.piece(
    plugins.jshint(jsHintConfig),
    plugins.if(!config.disableJSCS, plugins.jscs(jscsConfig))
  );
}

function resolveConfigFile(fileName) {

  var configFilesPathUser = path.resolve(process.cwd(), fileName);
  var configFilesPathDefault = __dirname.substring(0, __dirname.lastIndexOf('/'));

  configFilesPathDefault = path.resolve(configFilesPathDefault, fileName);

  return existsSync(configFilesPathUser) ? configFilesPathUser : configFilesPathDefault;

}

function existsSync(filename) {
  if (typeof(fs.accessSync) === 'function') { // newer node
    try {
      fs.accessSync(filename);
      return true;
    } catch (error) {
      if (typeof(error) !== 'object' || error.code !== 'ENOENT') {
        handyman.log('Unable to access ' + filename + ':');
        handyman.log(error.stack);
      }
      return false;
    }
  } else { // older node
    return fs.existsSync(filename);
  }
}

function validateES() {
  handyman.log('Validating js with ESlint');
  var stream = lazypipe()
    .pipe(plugins.eslint, esLintConfig)
    .pipe(plugins.eslint.format)
    .pipe(plugins.eslint.failOnError);

  return stream();
}
