## Pipeline-validate-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| Pipeline-validate-js     | Gulp Pipeline that allows you to validate the js files within your project. It uses JSHint and JSCS to complete the tasks. | 0.1.0 |

## Install

```
ssh://git@projects.kenzanmedia.com:7999/key/pipeline-validate-js.git
```
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

    + __config.disableJSCS:__ if _true_ doesn't validate the files using ```jscsrc```.

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

## LICENSE
