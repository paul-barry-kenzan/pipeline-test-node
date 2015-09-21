'use strict';

var validate = require('../');
var gulp = require('gulp');
var should = require('chai').should();

describe('pipeline-validate-js', function() {

  describe('validate()', function() {
    it('should throw an error when gulp is missing', function () {
      (function() {
        validate();
      }).should.Throw('Missing gulp option');
    });

    it('should complete the validate load', function () {
      (function() {
        validate(gulp);
      }).should.not.Throw('Missing gulp option');
    });
  });

});
