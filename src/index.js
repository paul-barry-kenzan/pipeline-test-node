'use strict';

var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');
var handyman = require('pipeline-handyman');
var path = require('path');
var lazypipe = require('lazypipe');

var config = {
  disableJSCS: false,
  parseOptions: {
    ecmaVersion: 5
  },
  linter: 'JSHint',
  reporter: {
    verbose: true
  }
};
var jsHintConfig = resolveConfigFile('.jshintrc');
var jscsConfig = resolveConfigFile('.jscsrc');
var esLintConfig = resolveConfigFile('.eslintrc');

module.exports = {
  validateJS : function (options) {
    if (options) {
      console.log(options);
      if(options.contains(parseOptions()){
        options = {parseOptions: options}
      })
      config = handyman.mergeConf(config, options);

      switch (config.parseOptions.ecmaVersion) {

        case 6:
          handyman.log('No support for Ecmascript 7 as of now');
          return;

        default:
          handyman.log('Validating js with JSCS, Options not valid');
      }
      console.log(config);
    }
    if(config.ecmaVersion)

    return validateES();
  }
}

function validateJSHint() {
  handyman.log('Validating js with JSCS');
  var stream = lazypipe()
    .pipe(function() {
      return plugins.if(args.verbose, plugins.print());
    })
    .pipe(jsValidationCombiner)
    .pipe(function() {
      return plugins.if(!config.disableJSCS, plugins.jscsStylish.combineWithHintResults());
    })

  return stream();
}

function jsValidationCombiner() {

  return plugins.piece(
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

  console.log('VALIDATE ES HAS BEEN CALLED')
  handyman.log('Validating js with ESlint');
  var stream = lazypipe()
    .pipe(function() {
      return plugins.if(args.verbose, plugins.print());
    })
    .pipe(jsValidationCombiner)
    .pipe(function() {
      return plugins.if(!config.disableJSCS, plugins.jscsStylish.combineWithHintResults());
    })
    .pipe(plugins.eslint, esLintConfig)
    .pipe(plugins.eslint.format)
    .pipe(plugins.eslint.failOnError);

  return stream();
}
