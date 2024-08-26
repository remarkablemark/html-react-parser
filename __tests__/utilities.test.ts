import type { Element } from 'html-dom-parser';
import * as React from 'react';

import type { Props } from '../src/attributes-to-props';
import {
  canTextBeChildOfNode,
  ELEMENTS_WITH_NO_TEXT_CHILDREN,
  isCustomComponent,
  PRESERVE_CUSTOM_ATTRIBUTES,
  setStyleProp,
} from '../src/utilities';

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
    parseInt(React.version.match(/^\d./)![0], 10) >= 16;

  it(`is ${isReactGreaterThan15} when React.version="${React.version}"`, () => {
    expect(PRESERVE_CUSTOM_ATTRIBUTES).toBe(isReactGreaterThan15);
  });
});

describe('setStyleProp', () => {
  it.each([undefined, null] as unknown as string[])(
    'does not set props.style when style=%p',
    (style) => {
      const props = {};
      expect(setStyleProp(style, props)).toBe(undefined);
      expect(props).toEqual({});
    },
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
    const props = { style: { foo: 'bar' }, width: 100 } as unknown as Props;
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
  it.each(Array.from(ELEMENTS_WITH_NO_TEXT_CHILDREN))(
    'returns false since text node cannot be child of %s',
    (nodeName) => {
      const node = {
        name: nodeName,
      } as Element;
      expect(canTextBeChildOfNode(node)).toBe(false);
    },
  );

  it('returns true if text can be child of <td/>', () => {
    const node = {
      name: 'td',
    } as Element;
    expect(canTextBeChildOfNode(node)).toBe(true);
  });
});
