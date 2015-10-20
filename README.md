## Pipeline-validate-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| Pipeline-validate-js| Pipeline to validate js files | 0.1.0 |

# Overview

Gulp Pipeline that allows you to validate the js files within your project. It defines an object that contains a validateJS() function. Depending on the configuration, the function will use JSHint and JSCS to complete the task, or ESLint.

This pipeline also offers the possibility of using personalized lint rules in other modules. If you'd like to use other rules within your project you can define a `.jshintrc`, `.jscs` or a `.eslintrc` file. These files should be in the root folder of the project. This pipeline will prioritize your rules over the default configurations.

_repo_: `https://github.com/kenzanmedia/pipeline-validate-js/`

_jenkins_: `TODO`

## Install
`npm install ssh:git@github.com:kenzanmedia/pipeline-validate-js.git`

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


  Default:
  ```javascript
  config = {
        disableJSCS: false,
        linter: 'JSHint'  
      }
  ```  

## Results

This pipeline returns an object. This object receives a stream with the files to validate. You can call the _validteJS_ method to run the validation. The method will report if any issues were found during validation. If no issues are present, it will return the stream.



## Dependencies

| Package       | npm link   |
| ------------- |:-------------:|
|gulp| https://www.npmjs.com/package/gulp |
|gulp-eslint| https://www.npmjs.com/package/gulp-eslint |
|gulp-if| https://www.npmjs.com/package/gulp-if |
|gulp-jscs| https://www.npmjs.com/package/gulp-jscs |
|gulp-jscs-stylish| https://www.npmjs.com/package/gulp-jscs-stylish |
|gulp-jshint| https://www.npmjs.com/package/gulp-jshint |
|gulp-load-plugins| https://www.npmjs.com/package/gulp-load-plugins |
|gulp-piece| https://www.npmjs.com/package/gulp-piece |
|gulp-print| https://www.npmjs.com/package/gulp-print |
|gulp-util| https://www.npmjs.com/package/gulp-util |
|jshint-stylish| https://www.npmjs.com/package/jshint-stylish |
|lodash| https://www.npmjs.com/package/lodash |
|yargs| https://www.npmjs.com/package/yargs |

## devDependencies

| Package       | npm link   |
| ------------- |:-------------:|
|chai| https://www.npmjs.com/package/chai |
|mocha| https://www.npmjs.com/package/mocha |

## LICENSE
Copyright 2015 Kenzan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.