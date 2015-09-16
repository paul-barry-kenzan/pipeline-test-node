/* jshint node: true */
'use strict';

var args = require('yargs').argv;
var glp = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');
var eslint = require('gulp-eslint');
var combiner = require('stream-combiner2');

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

  if (fs.accessSync(process.cwd() + '/' + fileName)) {
    configFile = process.cwd() + '/' + fileName;
  } else {
    configFile = __dirname + '/' + fileName;
  }
  return configFile;
}

module.exports = function (gulp) {

  gulp.task('validate:js', validate);
  gulp.task('validate:ES', validateES);

  function validateJs() {

    return combiner(
      glp.jshint(jsHintConfig),
      glp.if(!config.disableJSCS, glp.jscs(jscsConfig))
    );
  }

  function validate() {
    return gulp
      .src(config.files)
      .pipe(glp.if(args.verbose, glp.print()))
      .pipe(validateJs())
      .pipe(glp.if(!config.disableJSCS, glp.jscsStylish.combineWithHintResults()))
      .pipe(glp.jshint.reporter('jshint-stylish'))
      .pipe(glp.jshint.reporter('fail'));
  }

  function validateES() {
    return gulp
      .src(config.files)
      // eslint() attaches the lint output to the eslint property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failOnError last.
      .pipe(eslint.failOnError());

  }
};
