import HTMLReactParser from '../lib/index.js';

export * from '../lib/index.js';

// @ts-expect-error Property 'default' exists on type
export default (HTMLReactParser.default as typeof HTMLReactParser) ??
  HTMLReactParser;
