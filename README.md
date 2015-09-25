## pipeline-test-node

## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-test-node| Pipeline to run tests locally using mocha | 0.1.0 |

# Overview

Gulp Pipeline that generates a gulp task to run tests locally using `mocha`.

_repo_: `ssh://git@github.com:kenzanmedia/pipeline-test-node.git`

_jenkins_: `TODO`

## Install
`TODO`

## Usage
```javascript
var gulp = require('gulp');
require('pipeline-test-node')(gulp);

```


## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __config.files:__ Array with the paths that contain the tests to run.

    + __config.mochaConfig:__ Array to define mocha configurations. You can find the properties in [Mocha options](http://mochajs.org/#usage)


Default:
```javascript
config = {
  files: [
    'test/*.js',
    'test/**/*.js'
  ],
  mochaConfig: {
    reporter: 'List',
  }
}
```

## Results

This pipeline adds the following task to the gulp object.

  * __pipelineTest__

  This task runs the tests found on the paths provided in the option _config.files_. It uses mocha, and validates based on the configuration provided in _config.mochaConfig_. If no configuration is provided it will use mocha's default.  


## Dependencies
<!-- TODO Update pipeline-handyman npm link-->

| Package       | npm link   |
| ------------- |:-------------:|
|chai| https://www.npmjs.com/package/chai |
|gulp| https://www.npmjs.com/package/gulp |
|gulp-load-plugins| https://www.npmjs.com/package/gulp-load-plugins |
|gulp-mocha| https://www.npmjs.com/package/gulp-mocha |
|gulp-util| https://www.npmjs.com/package/gulp-util |
|mocha| https://www.npmjs.com/package/mocha |
|pipeline-handyman| git+ssh://git@github.com:kenzanmedia/pipeline-handyman.git#KEY-24-handyman-pipeline |


## LICENSE
<!-- TODO -->
