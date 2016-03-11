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
  linter: 'JSCS',
  reporter: {
    verbose: true
  }
};
var jsHintConfig = resolveConfigFile('.jshintrc');
var jscsConfig = resolveConfigFile('.jscsrc');
var esLintConfig = resolveConfigFile('.eslintrc');

module.exports = {
  validateJS : function (options) {
    if(options){
      var keyArray = Object.keys(options);
      for(var key in keyArray){
        if(keyArray[key] === 'ecmaVersion'){
          config.parseOptions.ecmaVersion = options.ecmaVersion
        }
      }
    }

    switch(true){
      case config.parseOptions.ecmaVersion >= 3 && config.parseOptions.ecmaVersion <= 5:
          handyman.log('ecma 5');
          break;
      case config.parseOptions.ecmaVersion === 6:
          handyman.log('ecma 6');
          break;
      case config.parseOptions.ecmaVersion === 7:
          handyman.log('ecma 7');
          break;
      default:
          handyman.log('default ecma5')

    }

    return validateES();
  }

}

//function validateJSHint() {
//  handyman.log('Validating js with JSCS');
//  var stream = lazypipe()
//    .pipe(function() {
//      return plugins.if(args.verbose, plugins.print());
//    })
//    .pipe(jsValidationCombiner)
//    .pipe(function() {
//      return plugins.if(!config.disableJSCS, plugins.jscsStylish.combineWithHintResults());
//    })
//
//  return stream();
//}

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

