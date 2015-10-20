## pipeline-test-node

## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-test-node| Pipeline to run tests locally using mocha | 0.1.0 |

# Overview

Gulp Pipeline that generates an object which has a method to run unit tests locally using `mocha`.

_repo_: `ssh://git@github.com:kenzanmedia/pipeline-test-node.git`

_jenkins_: `https://kenzan.ci.cloudbees.com/job/CI-pipelines-test-node/`

## Install
`npm install git+ssh://git@github.com/kenzanmedia/pipeline-test-node.git`

## Usage
```javascript
var gulp = require('gulp');
var testPipeline = require('pipeline-test-node')();

gulp.task('default', function() {
  return gulp
    .src(['src/**/*.spec.js'])
    .pipe(testPipeline.test());
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __plugins.mocha:__ Object to define mocha configurations. You can find the properties in [Mocha options](http://mochajs.org/#usage)


Default:
```javascript
config = {
  plugins: {
    mocha: {
      reporter: 'spec'
    }
  }
}
```

## Results

  This pipeline returns an object. This object receives a stream with the files to test, and you can call the _test_ method to run the unit tests. It uses mocha, and validates based on the configuration provided in _config.mochaConfig_. If no configuration is provided it will use mocha's default.  


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
