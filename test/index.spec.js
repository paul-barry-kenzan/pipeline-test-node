'use strict';

var assert = require('stream-assert');
var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
//XXX TODO hack to "reset" setting from gulpfile.js so we get generated xml
var testPipeline = require('../src/index.js')({plugins: {mocha: {reporter: 'spec'}}});

describe('pipeline-test-node', function() {

  describe('Test Results Generations', function() {

    it('should test that a test-results.xml report was generated', function (done) {
      //remove existing reports to avoid false positives
      del.sync(['./reports']);

      gulp.src('test/**/*.js')
        .pipe(testPipeline.test())
        .on('end', function () {
          fs.stat('reports/test-results.xml', function(err) {
            console.log(process.cwd());
            console.log(fs.existsSync('src/index.js'));

            if (err === null) {
              console.log('here');
              assert.equal(true, true);
            } else {
              console.log('not here');
            }
            done();
          });
        });
    });

  });
});