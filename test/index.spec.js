//
//
// 'use strict';
//
// var validatePipeline = require('../src/index.js')();
// var should = require('chai').should();
// var gulp = require('gulp');
//
// describe('pipeline-validate-js', function() {
//   it('should emit error on streamed file', function (done) {
//     gulp
//       .src('../src/resources.js')
//       .pipe(validatePipeline.validateJS())
//       .on('data', function (err) {
//         err.message.should.eql('Streaming not supported');
//         done();
//       });
//     done();
//   });
//
//   it('should emit error on streamed file', function (done) {
//     var stream = validatePipeline.validateJS();
//     stream.on('data', function() {
//       done();
//     });
//     stream.on('end', function() {
//         done();
//     });
//     stream.end(done);
//   });
// });
