'use strict';

var args = require('yargs').argv;
var glp = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');
var helper = require('../src/resources.js');
var PluginError = glp.util.PluginError;

var config = {
      files: [
        '*.js',
        'src/*.js',
        'src/**/*.js'
      ],
      disableJSCS: false
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
    // If the file isn't found, it uses the default linters
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
  gulp.task('validate:js', validate);
  gulp.task('validate:ES', validateES);

  function validateJs() {

    return glp.piece(
      glp.jshint(jsHintConfig),
      glp.if(!config.disableJSCS, glp.jscs(jscsConfig))
    );
  }

  function validate() {
    helper.log('Validating js with jshint');
    return gulp
      .src(config.files)
      .pipe(glp.if(args.verbose, glp.print()))
      .pipe(validateJs())
      .pipe(glp.if(!config.disableJSCS, glp.jscsStylish.combineWithHintResults()))
      .pipe(glp.jshint.reporter('jshint-stylish'))
      .pipe(glp.jshint.reporter('fail'));
  }

  function validateES() {
    helper.log('Validating js with eslint');
    return gulp
      .src(config.files)
      .pipe(glp.eslint())
      .pipe(glp.eslint.format())
      .pipe(glp.eslint.failOnError());

  }

};
