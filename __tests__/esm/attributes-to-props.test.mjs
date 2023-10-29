import { describe, it } from 'node:test';

import assert from 'assert';

import attributesToProps from '../../esm/attributes-to-props.mjs';

describe('attributesToProps', () => {
  it('exports default function', () => {
    assert.strictEqual(typeof attributesToProps, 'function');
  });
});
