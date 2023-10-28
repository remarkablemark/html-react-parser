const Benchmark = require('benchmark');
const { html } = require('../test/data');
const parse = require('..');

const suite = new Benchmark.Suite();

suite
  .add('html-to-react - Single', () => {
    parse(html.single);
  })
  .add('html-to-react - Multiple', () => {
    parse(html.multiple);
  })
  .add('html-to-react - Complex', () => {
    parse(html.complex);
  })
  .on('cycle', (event) => {
    process.stdout.write(String(event.target) + '\n');
  })
  .run({
    minSamples: 100,
    delay: 2
  });
