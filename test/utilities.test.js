const React = require('react');
const {
  PRESERVE_CUSTOM_ATTRIBUTES,
  camelCase,
  invertObject,
  isCustomComponent
} = require('../lib/utilities');

describe('utilities', () => {
  describe('camelCase', () => {
    it.each([undefined, null, {}, [], 0, 1, () => {}, new Date()])(
      'throws an error if first argument is %p',
      input => {
        expect(() => {
          camelCase(input);
        }).toThrow(TypeError);
      }
    );

    it.each([
      ['', ''],
      ['foo', 'foo'],
      ['fooBar', 'fooBar'],
      ['--fooBar', '--fooBar'],
      ['--foo-bar', '--foo-bar'],
      ['--foo-100', '--foo-100']
    ])(
      'does not modify string if it does not need to be camelCased',
      (input, expected) => {
        expect(camelCase(input)).toBe(expected);
      }
    );

    it.each([
      ['foo-bar', 'fooBar'],
      ['foo-bar-baz', 'fooBarBaz'],
      ['CAMEL-CASE', 'camelCase']
    ])('camelCases a string', (input, expected) => {
      expect(camelCase(input)).toBe(expected);
    });
  });

  describe('invertObject', () => {
    it.each([undefined, null, 'string', 0, 1, () => {}])(
      `throws an error if the first argument is %p`,
      input => {
        expect(() => {
          invertObject(input);
        }).toThrow(TypeError);
      }
    );

    it('swaps key with value', () => {
      expect(
        invertObject({
          foo: 'bar',
          baz: 'qux'
        })
      ).toEqual({
        bar: 'foo',
        qux: 'baz'
      });
    });

    it('swaps key with value if value is string', () => {
      expect(
        invertObject({
          $: 'dollar',
          _: 'underscore',
          num: 1,
          u: undefined,
          n: null
        })
      ).toEqual({
        dollar: '$',
        underscore: '_'
      });
    });

    describe('options', () => {
      it('applies override if provided', () => {
        expect(
          invertObject({ foo: 'bar', baz: 'qux' }, key => {
            if (key === 'foo') {
              return ['key', 'value'];
            }
          })
        ).toEqual({ key: 'value', qux: 'baz' });
      });

      it('does not apply override if invalid', () => {
        expect(
          invertObject({ foo: 'bar', baz: 'qux' }, key => {
            if (key === 'foo') {
              return ['key'];
            } else if (key === 'baz') {
              return { key: 'value' };
            }
          })
        ).toEqual({ bar: 'foo', qux: 'baz' });
      });
    });
  });

  describe('isCustomComponent', () => {
    it('returns true if the tag contains a hyphen and is not in the whitelist', () => {
      expect(isCustomComponent('my-custom-element')).toBe(true);
    });

    it('returns false if the tag is in the whitelist', () => {
      expect(isCustomComponent('annotation-xml')).toBe(false);
      expect(isCustomComponent('color-profile')).toBe(false);
      expect(isCustomComponent('font-face')).toBe(false);
    });

    it('returns true if the props contains an `is` key', () => {
      expect(isCustomComponent('button', { is: 'custom-button' })).toBe(true);
    });
  });

  describe('PRESERVE_CUSTOM_ATTRIBUTES', () => {
    const isReactGreaterThan15 =
      parseInt(React.version.match(/^\d./)[0], 10) >= 16;

    it(`is ${isReactGreaterThan15} when React.version="${React.version}"`, () => {
      expect(PRESERVE_CUSTOM_ATTRIBUTES).toBe(isReactGreaterThan15);
    });
  });
});
