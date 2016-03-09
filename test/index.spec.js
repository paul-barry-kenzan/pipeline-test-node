'use strict';
var should = require('chai').should();
var sinon = require('sinon');
var handyman = require('pipeline-handyman');
var validatePipeline =  require('../src/index.js');

describe('pipeline-validateJS', function(){
  it('should return a object', function () {
    (typeof validatePipeline).should.equal('object');
  });
  it('should contain a validateJS method', function(){
    (validatePipeline.validateJS).should.exist;
    (typeof validatePipeline.validateJS).should.equal('function');
  });
  describe('validateJS method', function (){
    var stream = validatePipeline.validateJS();

    it('should return an object', function(){
      (typeof stream).should.equal('object');
    });
    describe('validateJS log outputs', function(){
      var sandbox, spy;
      beforeEach(function() {
        sandbox = sinon.sandbox.create();
        spy = sandbox.spy(handyman, 'log');
      });

      afterEach(function(){
        sandbox.restore();
      });

      it("should test validateJS() with no options", function() {
        validatePipeline.validateJS();
        (spy.args[0][0]).should.equal('Validating js with JSHInt and JSCS');
      });

      it("should test validateJS() with invalid options", function() {
        validatePipeline.validateJS(234);
        (spy.args[0][0]).should.equal('Validating js with JSHInt and JSCS, Options not valid');
      });

      it("should test validateJS() with linter options", function() {
        validatePipeline.validateJS({linter: 'ESLint'});
        (spy.args[0][0]).should.equal('Validating js with ESlint');
      });
    })
  });
});
