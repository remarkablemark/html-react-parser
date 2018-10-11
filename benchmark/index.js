const Benchmark = require('benchmark');
const { data } = require('../test/helpers/');
const Parser = require('..');

const suite = new Benchmark.Suite();

suite
  .add('html-to-react - Single', () => {
    Parser(data.html.single);
  })
  .add('html-to-react - Multiple', () => {
    Parser(data.html.multiple);
  })
  .add('html-to-react - Complex', () => {
    Parser(data.html.complex);
  })
  .on('cycle', event => {
    process.stdout.write(String(event.target) + '\n');
  })
  .run({
    minSamples: 100,
    delay: 2
  });
