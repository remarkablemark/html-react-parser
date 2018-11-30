const React = require('react');
const assert = require('assert');
const {
  camelCase,
  invertObject,
  isCustomComponent,
  reactSupportsUnknownAttributes
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

  describe('utilities.reactSupportsUnknownAttributes', () => {
    let actualVersion;
    beforeEach(() => {
      actualVersion = React.version;
    });

    afterEach(() => {
      React.version = actualVersion;
    });

    it('should return true for React 16 and above', () => {
      React.version = '16.6.0';
      assert.equal(reactSupportsUnknownAttributes(), true);
    });

    it('should return false for React < 16', () => {
      React.version = '15.1.2';
      assert.equal(reactSupportsUnknownAttributes(), false);

      React.version = '0.14';
      assert.equal(reactSupportsUnknownAttributes(), false);
    });
  });
});
