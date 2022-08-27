const React = require('react');
const {
  PRESERVE_CUSTOM_ATTRIBUTES,
  invertObject,
  isCustomComponent,
  setStyleProp,
  elementsWithNoTextChildren,
  canTextBeChildOfNode
} = require('../lib/utilities');

describe('invertObject', () => {
  it.each([undefined, null, '', 'test', 0, 1, true, false, () => {}])(
    'throws error for value: %p',
    value => {
      expect(() => {
        invertObject(value);
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

describe('setStyleProp', () => {
  it.each([undefined, null])(
    'does not set props.style when style=%p',
    style => {
      const props = {};
      expect(setStyleProp(style, props)).toBe(undefined);
      expect(props).toEqual({});
    }
  );

  it('sets props.style', () => {
    const style = `
      color: red;
      background-color: #bada55;
      -webkit-user-select: none;
      line-height: 1;
      background-image:
        linear-gradient(to bottom, rgba(255,255,0,0.5), rgba(0,0,255,0.5)),
        url('https://mdn.mozillademos.org/files/7693/catfront.png');
    `;
    const props = { style: { foo: 'bar' }, width: 100 };
    expect(setStyleProp(style, props)).toBe(undefined);
    expect(props).toMatchInlineSnapshot(`
      {
        "style": {
          "WebkitUserSelect": "none",
          "backgroundColor": "#bada55",
          "backgroundImage": "linear-gradient(to bottom, rgba(255,255,0,0.5), rgba(0,0,255,0.5)),
              url('https://mdn.mozillademos.org/files/7693/catfront.png')",
          "color": "red",
          "lineHeight": "1",
        },
        "width": 100,
      }
    `);
  });

  it('does not set props.style when style attribute corrupt', () => {
    const style = `font - size: 1em`;
    const props = {};
    expect(setStyleProp(style, props)).toBe(undefined);
    expect(props).toEqual({ style: {} });
  });
});

describe('canTextBeChildOfNode', () => {
  it.each(Array.from(elementsWithNoTextChildren))(
    'returns false since text node cannot be child of %s',
    nodeName => {
      const node = {
        name: nodeName
      };
      expect(canTextBeChildOfNode(node)).toBe(false);
    }
  );

  it('returns true if text can be child of <td/>', () => {
    const node = {
      name: 'td'
    };
    expect(canTextBeChildOfNode(node)).toBe(true);
  });
});
