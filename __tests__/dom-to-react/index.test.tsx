import htmlToDOM from 'html-dom-parser';
import type Preact from 'preact';
import type React from 'react';

import { type DOMNode, Element, type HTMLReactParserOptions } from '../../src';
import domToReact from '../../src/dom-to-react';
import { html, svg } from '../data';
import { render } from '../helpers';

describe('domToReact', () => {
  it.each([
    ['comment', html.comment],
    ['doctype', html.doctype],
  ])('skips %s', (type, value) => {
    expect(domToReact(htmlToDOM(value))).toEqual([]);
  });

  it('converts "text" to "text"', () => {
    const text = 'text';
    expect(domToReact(htmlToDOM(text))).toBe(text);
  });

  it('converts single DOM node to React', () => {
    const reactElement = domToReact(htmlToDOM(html.single));
    expect(reactElement).toMatchSnapshot();
  });

  it('converts multiple DOM nodes to React', () => {
    const reactElements = domToReact(
      htmlToDOM(html.multiple),
    ) as React.JSX.Element[];
    reactElements.forEach((reactElement, index) => {
      expect(reactElement.key).toBe(String(index));
    });
    expect(reactElements).toMatchSnapshot();
  });

  it('converts <textarea> correctly', () => {
    // https://reactjs.org/docs/forms.html#the-textarea-tag
    const reactElement = domToReact(htmlToDOM(html.textarea));
    expect(reactElement).toMatchSnapshot();
  });

  it('does not escape <script> content', () => {
    const reactElement = domToReact(htmlToDOM(html.script));
    expect(reactElement).toMatchSnapshot();
  });

  it('does not escape <style> content', () => {
    const reactElement = domToReact(htmlToDOM(html.style));
    expect(reactElement).toMatchSnapshot();
  });

  it('does not have `children` for void elements', () => {
    const reactElement = domToReact(htmlToDOM(html.img)) as React.JSX.Element;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(reactElement.props.children).toBe(undefined);
  });

  it('does not throw an error for void elements', () => {
    expect(() => {
      render(<div>{domToReact(htmlToDOM(html.void))}</div>);
    }).not.toThrow();
  });

  it('skips doctype and comments', () => {
    const reactElements = domToReact(
      htmlToDOM(html.doctype + html.single + html.comment + html.single),
    ) as React.JSX.Element[];
    expect(reactElements).toHaveLength(2);
    expect(reactElements[0].key).toBe('1');
    expect(reactElements[1].key).toBe('3');
    expect(reactElements).toMatchSnapshot();
  });

  it('converts SVG element with viewBox attribute', () => {
    const reactElement = domToReact(
      htmlToDOM(svg.simple, { lowerCaseAttributeNames: false }),
    );
    expect(reactElement).toMatchSnapshot();
  });

  it('converts custom element with attributes', () => {
    expect(domToReact(htmlToDOM(html.customElement))).toMatchSnapshot();
  });

  it('converts LaTeX', () => {
    expect(domToReact(htmlToDOM(html.latex))).toMatchSnapshot();
  });
});

describe('library option', () => {
  let react: typeof React;
  let preact: typeof Preact;

  beforeAll(async () => {
    react = await import('react');
    preact = await import('preact');
  });

  it('converts with React by default', () => {
    const reactElement = domToReact(htmlToDOM(html.single));
    expect(react.isValidElement(reactElement)).toBe(true);
    expect(preact.isValidElement(reactElement)).toBe(false);
    expect(reactElement).toEqual(react.createElement('p', {}, 'foo'));
  });

  it('converts with Preact', () => {
    const parsedElement = domToReact(htmlToDOM(html.single), {
      library: preact,
    });
    const preactElement = preact.createElement('p', {}, 'foo');

    expect(react.isValidElement(parsedElement)).toBe(false);
    expect(preact.isValidElement(parsedElement)).toBe(true);

    // remove `__v` key since it's causing test equality to fail
    // @ts-expect-error Property '__v' does not exist on type 'string'.
    delete parsedElement.__v;
    // @ts-expect-error Property '__v' does not exist on type 'VNode<ClassAttributes<HTMLElement>>'.
    delete preactElement.__v;

    expect(parsedElement).toEqual(preactElement);
  });
});

describe('replace option', () => {
  it.each([undefined, null, 0, 1, true, false, {}])(
    'does not replace for invalid return value %p',
    (value) => {
      const reactElement = domToReact(htmlToDOM('<br>'), {
        replace: () => value,
      }) as React.JSX.Element;
      expect(reactElement).toEqual(<br />);
    },
  );

  it('does not set key for a single node', () => {
    const reactElement = domToReact(htmlToDOM(html.single), {
      replace: () => <div />,
    }) as React.JSX.Element;
    expect(reactElement.key).toBe(null);
  });

  it('does not modify keys if they are already set', () => {
    const reactElements = domToReact(
      htmlToDOM(html.single + html.customElement),
      {
        replace(domNode) {
          const element = domNode as Element;

          if (element.name === 'p') {
            return <p>replaced foo</p>;
          }

          if (element.name === 'custom-element') {
            return (
              // @ts-expect-error Property 'custom-button' does not exist on type 'JSX.IntrinsicElements'.
              <custom-button
                key="myKey"
                class="myClass"
                custom-attribute="replaced value"
              />
            );
          }
        },
      },
    ) as React.JSX.Element[];

    expect(reactElements[0].key).toBe('0');
    expect(reactElements[1].key).toBe('myKey');
  });

  it('replaces with children', () => {
    const options: HTMLReactParserOptions = {
      replace(domNode) {
        if (domNode instanceof Element) {
          return domToReact(domNode.children as DOMNode[], options);
        }
      },
    };
    const reactElement = domToReact(htmlToDOM('<div>test</div>'), options);
    expect(reactElement).toEqual(<div>test</div>);
  });

  it('passes index as the 2nd argument', () => {
    const reactElement = domToReact(htmlToDOM('<li>one</li><li>two</li>'), {
      replace(domNode, index) {
        expect(typeof index).toBe('number');
      },
    });
    expect(reactElement).toHaveLength(2);
  });
});

describe('transform option', () => {
  it('can wrap all elements', () => {
    const reactElement = domToReact(htmlToDOM(html.list), {
      transform: (reactNode, domNode, index) => {
        return <div key={index}>{reactNode}</div>;
      },
    }) as React.JSX.Element;

    expect(reactElement.key).toBe('0');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(reactElement.props.children.props.children[0].key).toBe('0');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(reactElement.props.children.props.children[1].key).toBe('1');
    expect(reactElement).toMatchSnapshot();
  });
});

describe('domToReact', () => {
  describe('when React >=16', () => {
    it('preserves unknown attributes', () => {
      const reactElement = domToReact(htmlToDOM(html.customElement));
      expect(reactElement).toMatchSnapshot();
    });
  });
});
