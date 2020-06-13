const assert = require('assert');
const React = require('react');
const {
  PRESERVE_CUSTOM_ATTRIBUTES,
  camelCase,
  invertObject,
  isCustomComponent
} = require('../lib/utilities');

describe('utilities', () => {
  describe('camelCase', () => {
    [undefined, null, 1337, {}, []].forEach(value => {
      it(`throws an error if first argument is ${value}`, () => {
        assert.throws(() => {
          camelCase(value);
        }, TypeError);
      });
    });

    it('does not modify string if it does not need to be camelCased', () => {
      [
        ['', ''],
        ['foo', 'foo'],
        ['fooBar', 'fooBar'],
        ['--fooBar', '--fooBar'],
        ['--foo-bar', '--foo-bar'],
        ['--foo-100', '--foo-100']
      ].forEach(testCase => {
        assert.strictEqual(camelCase(testCase[0]), testCase[1]);
      });
    });

    it('camelCases a string', () => {
      [
        ['foo-bar', 'fooBar'],
        ['foo-bar-baz', 'fooBarBaz'],
        ['CAMEL-CASE', 'camelCase']
      ].forEach(testCase => {
        assert.strictEqual(camelCase(testCase[0]), testCase[1]);
      });
    });
  });

  describe('invertObject', () => {
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

  describe('isCustomComponent', () => {
    it('returns true if the tag contains a hyphen and is not in the whitelist', () => {
      assert.strictEqual(isCustomComponent('my-custom-element'), true);
    });

    it('returns false if the tag is in the whitelist', () => {
      assert.strictEqual(isCustomComponent('annotation-xml'), false);
      assert.strictEqual(isCustomComponent('color-profile'), false);
      assert.strictEqual(isCustomComponent('font-face'), false);
    });

    it('returns true if the props contains an `is` key', () => {
      assert.strictEqual(
        isCustomComponent('button', { is: 'custom-button' }),
        true
      );
    });
  });

  describe('PRESERVE_CUSTOM_ATTRIBUTES', () => {
    const isReactGreaterThan15 =
      parseInt(React.version.match(/^\d./)[0], 10) >= 16;

    it(`is ${isReactGreaterThan15} when React.version="${React.version}"`, () => {
      assert.strictEqual(PRESERVE_CUSTOM_ATTRIBUTES, isReactGreaterThan15);
    });
  });
});
