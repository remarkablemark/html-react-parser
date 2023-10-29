import { describe, it } from 'node:test';

import assert from 'assert';

import domToReact from '../../esm/dom-to-react.mjs';

describe('domToReact', () => {
  it('exports default function', () => {
    assert.strictEqual(typeof domToReact, 'function');
  });
});
