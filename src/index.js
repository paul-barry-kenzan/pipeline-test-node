'use strict';

var plugins = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');
var handyman = require('pipeline-handyman');
var path = require('path');
var lazypipe = require('lazypipe');

var pipelineConfig = {
  parseOptions: {
    ecmaVersion:
  }
};
var esLintConfig = resolveConfigFile('.eslintrc');

module.exports = {
  validateJS: function (options) {
    if (options) {
      if((typeof options === 'object' && !Array.isArray(options)) || typeof options === 'string'){
        if(typeof options === 'object'){
          var keyArray = Object.keys(options);
          for (var key in keyArray) {
            if (keyArray[key] === 'ecmaVersion') {
              pipelineConfig.parseOptions.ecmaVersion = options.ecmaVersion
            }
          }
        }else{
          esLintConfig = resolveConfigFile(options);
        }

      }else{
        handyman.log('Validading js with ESlint ecmaScript5, ** Options not valid **');
      }
    }

    switch (true) {

      case pipelineConfig.parseOptions.ecmaVersion >= 3 && pipelineConfig.parseOptions.ecmaVersion <= 5:
        handyman.log('Validating js version ' + pipelineConfig.parseOptions.ecmaVersion + ' with ESlint');
        break;
      default:
        handyman.log('Validading js with ESlint ecmaScript5, ** ecmaVersion ' + pipelineConfig.parseOptions.ecmaVersion + ' is not supported! **')

    }

    return validateES();
  }
};

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
  var stream = lazypipe()
    .pipe(plugins.eslint, esLintConfig)
    .pipe(plugins.eslint.format)
    .pipe(plugins.eslint.failOnError);

  return stream();
}

