import { describe, it } from 'node:test';

import assert from 'assert';

import {
  canTextBeChildOfNode,
  ELEMENTS_WITH_NO_TEXT_CHILDREN,
  isCustomComponent,
  PRESERVE_CUSTOM_ATTRIBUTES,
  returnFirstArg,
  setStyleProp,
} from '../../esm/utilities.mjs';

describe('utilities', () => {
  it('exports "isCustomComponent" function', () => {
    assert.strictEqual(typeof isCustomComponent, 'function');
  });

  it('exports "setStyleProp" function', () => {
    assert.strictEqual(typeof setStyleProp, 'function');
  });

  it('exports "PRESERVE_CUSTOM_ATTRIBUTES" boolean', () => {
    assert.strictEqual(typeof PRESERVE_CUSTOM_ATTRIBUTES, 'boolean');
  });

  it('exports "ELEMENTS_WITH_NO_TEXT_CHILDREN" set', () => {
    assert.ok(ELEMENTS_WITH_NO_TEXT_CHILDREN instanceof Set);
  });

  it('exports "canTextBeChildOfNode" function', () => {
    assert.strictEqual(typeof canTextBeChildOfNode, 'function');
  });

  it('exports "returnFirstArg" function', () => {
    assert.strictEqual(returnFirstArg('arg'), 'arg');
  });
});
