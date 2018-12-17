const assert = require('assert');
const React = require('react');
const {
  PRESERVE_CUSTOM_ATTRIBUTES,
  camelCase,
  invertObject,
  isCustomComponent
} = require('../lib/utilities');

describe('utilties.camelCase', () => {
  [undefined, null, 1337, {}, []].forEach(value => {
    it(`throws an error if first argument is ${value}`, () => {
      assert.throws(() => {
        camelCase(value);
      }, TypeError);
    });
  });

  it('does not modify string if it does not need to be camelCased', () => {
    assert.equal(camelCase(''), '');
    assert.equal(camelCase('foo'), 'foo');
    assert.equal(camelCase('fooBar'), 'fooBar');
    assert.equal(camelCase('--fooBar'), '--fooBar');
    assert.equal(camelCase('--foo-bar'), '--foo-bar');
  });

  it('camelCases a string', () => {
    assert.equal(camelCase('foo-bar'), 'fooBar');
    assert.equal(camelCase('foo-bar-baz'), 'fooBarBaz');
    assert.equal(camelCase('CAMEL-CASE'), 'camelCase');
  });
});

describe('utilities.invertObject', () => {
  [undefined, null, 'foo', 1337].forEach(value => {
    it(`throws an error if the first argument is ${value}`, () => {
      assert.throws(() => {
        invertObject(value);
      }, TypeError);
    });
  });

  it('swaps key with value', () => {
    assert.deepEqual(invertObject({ foo: 'bar', baz: 'qux' }), {
      bar: 'foo',
      qux: 'baz'
    });
  });

  it('swaps key with value if value is string', () => {
    assert.deepEqual(
      invertObject({
        $: 'dollar',
        _: 'underscore',
        num: 1,
        u: undefined,
        n: null
      }),
      {
        dollar: '$',
        underscore: '_'
      }
    );
  });

  describe('options', () => {
    it('applies override if provided', () => {
      assert.deepEqual(
        invertObject({ foo: 'bar', baz: 'qux' }, key => {
          if (key === 'foo') {
            return ['key', 'value'];
          }
        }),
        { key: 'value', qux: 'baz' }
      );
    });

    it('does not apply override if invalid', () => {
      assert.deepEqual(
        invertObject({ foo: 'bar', baz: 'qux' }, key => {
          if (key === 'foo') {
            return ['key'];
          } else if (key === 'baz') {
            return { key: 'value' };
          }
        }),
        { bar: 'foo', qux: 'baz' }
      );
    });
  });
});

describe('utilities.isCustomComponent', () => {
  it('returns true if the tag contains a hyphen and is not in the whitelist', () => {
    assert.equal(isCustomComponent('my-custom-element'), true);
  });

  it('returns false if the tag is in the whitelist', () => {
    assert.equal(isCustomComponent('annotation-xml'), false);
    assert.equal(isCustomComponent('color-profile'), false);
    assert.equal(isCustomComponent('font-face'), false);
  });

  it('returns true if the props contains an `is` key', () => {
    assert.equal(isCustomComponent('button', { is: 'custom-button' }), true);
  });
});

describe('utilities.PRESERVE_CUSTOM_ATTRIBUTES', () => {
  const isReact16AndUp = Number(React.version.match(/^\d./)[0]) >= 16;

  it(`is ${isReact16AndUp} when React.version="${React.version}"`, () => {
    assert.equal(PRESERVE_CUSTOM_ATTRIBUTES, isReact16AndUp);
  });
});
