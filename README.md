## pipeline-test-node

## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-test-node| Pipeline to run tests locally using mocha | 0.1.0 |

# Overview

Gulp Pipeline that generates an object which has a method to run unit tests locally using `mocha`.

_repo_: `ssh://git@github.com:kenzanmedia/pipeline-test-node.git`

_jenkins_: `TODO`

## Install
`TODO`

## Usage
```javascript
var gulp = require('gulp');
var testPipeline = require('pipeline-test-node')();

gulp.task('default', function() {
  return gulp
    .src(files)
    .pipe(testPipeline.test());
});
```


## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __config.mochaConfig:__ Array to define mocha configurations. You can find the properties in [Mocha options](http://mochajs.org/#usage)


Default:
```javascript
config = {
  mochaConfig: {
    reporter: 'List',
  }
}
```

## Results

  This pipeline returns an object. This object receives a stream with the files to test, and you can call the _test_ method to run the unit tests. It uses mocha, and validates based on the configuration provided in _config.mochaConfig_. If no configuration is provided it will use mocha's default.  


## Dependencies

| Package       | npm link   |
| ------------- |:-------------:|
|chai| https://www.npmjs.com/package/chai |
|gulp| https://www.npmjs.com/package/gulp |
|gulp-load-plugins| https://www.npmjs.com/package/gulp-load-plugins |
|gulp-mocha| https://www.npmjs.com/package/gulp-mocha |
|gulp-util| https://www.npmjs.com/package/gulp-util |
|mocha| https://www.npmjs.com/package/mocha |
|lazypipe| https://www.npmjs.com/package/lazypipe |
|pipeline-handyman| git+ssh://git@github.com:kenzanmedia/pipeline-handyman.git#KEY-24-handyman-pipeline |


## LICENSE
<!-- TODO -->
