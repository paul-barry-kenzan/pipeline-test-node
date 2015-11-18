## pipeline-validate-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-validate-js| Pipeline to validate js files | 0.2.0 |

# Overview

Gulp Pipeline that allows you to validate the js files within your project. It defines an object that contains a 
validateJS() function. Depending on the configuration, the function will use JSHint and JSCS to complete the task, or 
ESLint.

This pipeline also offers the possibility of using personalized lint rules in other modules. If you'd like to use other 
rules within your project you can define a `.jshintrc`, `.jscs` or a `.eslintrc` file. These files should be in the 
root folder of the project. This pipeline will prioritize your rules over the default configurations.

**NOTE: as this project is still pre 1.0.0, it is subject to possible backwards incompatible changes as it matures.**

## Install

`npm install pipeline-validate-js --save-dev`

## Usage
```javascript
var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js')();


gulp.task('default', function() {
  return gulp
    .src(files)
    .pipe(validatePipeline.validateJS());
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __config.disableJSCS:__ If _true_ doesn't validate the files using `jscsrc`. You might want to disable JSCS if working on a legacy project. Otherwise this option should _false_.

    + __config.linter:__ Sets the desire rules to validate the files. It can be set to `JSHint` or `ESLint`.
    
    + __config.reporter:__ passthru reporting configuration options to JSHint


  Default:
  ```javascript
  config = {
    disableJSCS: false,
    linter: 'JSHint',
    reporter: {
      verbose: true
    }
  }
  ```  

## Results

This pipeline returns an object. This object receives a stream with the files to validate. You can call the _validteJS_ 
method to run the validation. The method will report if any issues were found during validation. If no issues are 
present, it will return the stream.

## LICENSE
Copyright 2015 Kenzan, LLC <http://kenzan.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.