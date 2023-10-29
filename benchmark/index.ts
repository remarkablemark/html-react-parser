import Benchmark from 'benchmark';

import { html } from '../__tests__/data';
import parse from '../src';

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
  .on('cycle', (event: Benchmark.Event) => {
    process.stdout.write(String(event.target) + '\n');
  })
  .run({
    minSamples: 100,
    delay: 2,
  });
