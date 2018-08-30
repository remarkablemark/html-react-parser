'use strict';

var Benchmark = require('benchmark');
var helpers = require('./helpers/');
var Parser = require('../');

var suite = new Benchmark.Suite();
var mocks = helpers.mocks;

suite
  .add('html-to-react - Single', function() {
    Parser(mocks.html.single);
  })
  .add('html-to-react - Multiple', function() {
    Parser(mocks.html.multiple);
  })
  .add('html-to-react - Complex', function() {
    Parser(mocks.html.complex);
  })
  .on('cycle', function(event) {
    process.stdout.write(String(event.target) + '\n');
  })
  .run({
    minSamples: 100,
    delay: 2
  });
