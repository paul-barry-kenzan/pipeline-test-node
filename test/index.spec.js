'use strict';
var should = require('chai').should();
var sinon = require('sinon');
var handyman = require('pipeline-handyman');
var validatePipeline =  require('../src/index.js');
var gulp = require('gulp');

describe('pipeline-validateJS', function(){
  it('should return a object', function () {
    (typeof validatePipeline).should.equal('object');
    console.log(validatePipeline)
  });

  it('should contain a validateJS method', function(){
    (validatePipeline.validateJS).should.exist;
    (typeof validatePipeline.validateJS).should.equal('function');
  });

  describe('validateJS method', function (){

    it('should return an object', function(){
      var stream = validatePipeline.validateJS();
      (typeof stream).should.equal('object');
    });

    describe('validateJS log outputs', function(){
      var sandbox, spy, stream;
      beforeEach(function() {
        sandbox = sinon.sandbox.create();
        spy = sandbox.spy(handyman, 'log');
      });

      afterEach(function(){
        sandbox.restore();
      });

      it("should test validateJS() with no options", function() {
        validatePipeline.validateJS();
        (spy.args[0][0]).should.equal('Validating js version 5 with ESlint');
      });

      it("should test validateJS() with invalid options", function() {
        validatePipeline.validateJS(234);
        (spy.args[0][0]).should.equal('Validading js with ESlint ecmaScript5, ** Options not valid **');
      });

      it("should test validateJS() with a string as an  options", function() {
        validatePipeline.validateJS('.customFile');
        (spy.args[0][0]).should.equal('Validating js version 5 with ESlint');
      });

      it("should test validateJS() with ecmaVersion options", function() {
        validatePipeline.validateJS({ecmaVersion: 5});
        (spy.args[0][0]).should.equal('Validating js version 5 with ESlint');
      });

      it("should test validateJS() with not supported ecmaVersion options", function() {
        validatePipeline.validateJS({ecmaVersion: 7});
        (spy.args[0][0]).should.equal('Validading js with ESlint ecmaScript5, ** ecmaVersion 7 is not supported! **');
      });
    })

    describe('validateJS config settings', function(){
      beforeEach(function(){
        var config = {
          files: [
            '*.js',
            './src/*.js',
            './src/**/*.js'
          ]
        };
      });

      gulp.task('test1', function() {
        return gulp
          .src(config.files)
          .pipe(function(){
            console.log('pipe entered')
          })
          .pipe(validatePipeline.validateJS('.jscsrc'));
      });
      gulp.watch('test1');
    });
  });
});
