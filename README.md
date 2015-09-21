## Pipeline-validate-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| Pipeline-validate-js| Pipeline to validate js files | 0.1.0 |

# Overview

Gulp Pipeline that allows you to validate the js files within your project. It defines two gulp tasks to complete the validation. One uses JSHint and JSCS to complete the task, the other one uses ESLint.

_repo_: ``ssh://git@projects.kenzanmedia.com:7999/key/pipeline-validate-js.git``

_jenkins_: ``TODO``

## Install
`` TODO ``

## Usage
```
var gulp = require('gulp');
require('./src/index.js')(gulp);

gulp.task('default', ['validate:js']);
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.
    + __config.files:__ Array with the paths to validate.

    + __config.disableJSCS:__ if _true_ doesn't validate the files using ``jscsrc``.

  Default:
  ```
  config = {
        files: [
          '*.js',
          'src/*.js',
          'src/**/*.js'
        ],
        disableJSCS: false
      }
  ```  

## Results

Adds the following tasks to the gulp object.

__validate:js__

Validates the files found on the paths provided in the options using JSHint and JSCS-- the last one only if disableJSCS is _false_

__validate:ES__

Uses ES6 rules to validate the js files.

## Dependencies

| Package       | npm link   |
| ------------- |:-------------:|
|chai| https://www.npmjs.com/package/chai |
|gulp| https://www.npmjs.com/package/gulp |
|gulp-eslint| https://www.npmjs.com/package/gulp-eslint |
|gulp-if| https://www.npmjs.com/package/gulp-if |
|gulp-jscs| https://www.npmjs.com/package/gulp-jscs |
|gulp-jscs-stylish| https://www.npmjs.com/package/gulp-jscs-stylish |
|gulp-jshint| https://www.npmjs.com/package/gulp-jshint |
|gulp-load-plugins| https://www.npmjs.com/package/gulp-load-plugins |
|gulp-mocha| https://www.npmjs.com/package/gulp-mocha
|gulp-piece| https://www.npmjs.com/package/gulp-piece |
|gulp-print| https://www.npmjs.com/package/gulp-print |
|gulp-util| https://www.npmjs.com/package/gulp-util |
|jshint-stylish| https://www.npmjs.com/package/jshint-stylish |
|lodash| https://www.npmjs.com/package/lodash |
|mocha| https://www.npmjs.com/package/mocha |
|yargs| https://www.npmjs.com/package/yargs |

## LICENSE
