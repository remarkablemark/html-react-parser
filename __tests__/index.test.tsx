import * as domhandler from 'domhandler';
import type { Element } from 'html-dom-parser';
import type { JSX } from 'react';

import * as HTMLReactParser from '../src';
import parse from '../src';
import { html, svg } from './data';
import { render } from './helpers';

describe('module', () => {
  it('exports default', () => {
    expect(parse).toBeInstanceOf(Function);
  });

  it.each(['default', 'attributesToProps', 'domToReact', 'htmlToDOM'] as const)(
    'exports %p',
    (key) => {
      expect(HTMLReactParser[key]).toBeInstanceOf(Function);
    },
  );

  it.each(['Comment', 'Element', 'ProcessingInstruction', 'Text'] as const)(
    'exports %s',
    (key) => {
      expect(HTMLReactParser[key]).toBeInstanceOf(Function);
      expect(HTMLReactParser[key]).toBe(
        domhandler[key as keyof typeof domhandler],
      );
    },
  );
});

describe('HTMLReactParser', () => {
  it.each([undefined, null, {}, [], true, false, 0, 1, () => {}, new Date()])(
    'throws error for value: %p',
    (value) => {
      expect(() => {
        parse(value as string);
      }).toThrow(TypeError);
    },
  );

  it('parses empty string to empty array', () => {
    expect(parse('')).toEqual([]);
  });

  it.each(['a', 'text'])('parses string', (text) => {
    expect(parse(text)).toBe(text);
  });

  it.each(['\n', '\r', '\n\r', 'foo\nbar', 'foo\rbar', 'foo\n\rbar\r'])(
    'parses string with newlines %p',
    (text) => {
      expect(parse(text)).toBe(text);
    },
  );

  it.each([
    '\n<br>',
    '<br>\r',
    '\n<br>\r',
    '<p>foo\nbar\r</p>',
    '<p>foo</p>\rbar',
    'foo<p>\n\rbar</p>\r',
  ])('parses HTML with newlines', (html) => {
    expect(parse(html)).toMatchSnapshot();
  });

  it('parses single HTML element', () => {
    expect(parse(html.single)).toMatchSnapshot();
  });

  it('parses single HTML element with comment', () => {
    // comment should be ignored
    expect(parse(html.single + html.comment)).toMatchSnapshot();
  });

  it('parses multiple HTML elements', () => {
    expect(parse(html.multiple)).toMatchSnapshot();
  });

  it('parses complex HTML with doctype', () => {
    expect(parse(html.doctype + html.complex)).toMatchSnapshot();
  });

  it('parses empty <script>', () => {
    expect(parse('<script></script>')).toMatchSnapshot();
  });

  it('parses empty <style>', () => {
    expect(parse('<style></style>')).toMatchSnapshot();
  });

  it('parses form', () => {
    expect(parse(html.form)).toMatchSnapshot();
  });

  it('parses list', () => {
    expect(parse(html.list)).toMatchSnapshot();
  });

  it('parses template', () => {
    expect(parse(html.template)).toMatchSnapshot();
  });

  it('parses SVG', () => {
    expect(parse(svg.complex)).toMatchSnapshot();
  });

  it('decodes HTML entities', () => {
    const encodedEntities = 'asdf &amp; &yuml; &uuml; &apos;';
    const decodedEntities = "asdf & ÿ ü '";
    const reactElement = parse('<i>' + encodedEntities + '</i>') as JSX.Element;
    expect(reactElement.props.children).toBe(decodedEntities);
  });

  it('escapes tags inside of <title>', () => {
    expect(parse(html.title)).toMatchSnapshot();
  });
});

describe('replace option', () => {
  it('replaces the element if a valid React element is returned', () => {
    expect(
      parse(html.complex, {
        replace(domNode) {
          if ((domNode as Element).name === 'title') {
            return <title>Replaced Title</title>;
          }
        },
      }),
    ).toMatchSnapshot();
  });

  it('does not replace the element if an invalid React element is returned', () => {
    expect(
      parse(html.complex, {
        replace(domNode) {
          if ((domNode as Element).attribs?.id === 'header') {
            return {
              type: 'h1',
              props: { children: 'Heading' },
            };
          }
        },
      }),
    ).toMatchSnapshot();
  });
});

describe('library option', () => {
  const Preact = require('preact');
  const React = require('react');

  it('converts with Preact instead of React', () => {
    const parsedElement = parse(html.single, { library: Preact });
    const preactElement = Preact.createElement('p', {}, 'foo');
    expect(React.isValidElement(parsedElement)).toBe(false);
    expect(Preact.isValidElement(parsedElement)).toBe(true);
    // remove `__v` key since it's causing test equality to fail
    // @ts-expect-error Property '__v' does not exist on type 'string | Element | Element[]'. Property '__v' does not exist on type 'string'.
    delete parsedElement.__v;
    delete preactElement.__v;
    expect(parsedElement).toEqual(preactElement);
  });
});

describe('htmlparser2 option', () => {
  it('parses XHTML with xmlMode enabled', () => {
    // using self-closing syntax (`/>`) for non-void elements is invalid
    // which causes elements to nest instead of being rendered correctly
    // enabling htmlparser2 option xmlMode resolves this issue
    const options = { htmlparser2: { xmlMode: true } };
    expect(parse('<ul><li/><li/></ul>', options)).toMatchSnapshot();
  });
});

describe('trim option', () => {
  it('preserves whitespace text nodes when disabled if valid in parent (default)', () => {
    const html = `<table>
  <tbody>
    <tr><td>hello</td><td>\n</td><td>&nbsp;</td>\t</tr>\r
  </tbody>
</table>`;
    const reactElement = parse(html) as JSX.Element;
    expect(render(reactElement)).toBe(
      '<table><tbody><tr><td>hello</td><td>\n</td><td>\u00a0</td></tr></tbody></table>',
    );
    expect(reactElement).toMatchSnapshot();
  });

  it('removes whitespace text nodes when enabled', () => {
    const html = `<table>
      <tbody><tr><td> text </td><td> </td>\t</tr>\r</tbody>\n</table>`;
    const options = { trim: true };
    const reactElement = parse(html, options) as JSX.Element;
    expect(render(reactElement)).toBe(
      '<table><tbody><tr><td> text </td><td></td></tr></tbody></table>',
    );
  });
});

describe('invalid styles', () => {
  it('copes with invalid styles', () => {
    const html = '<p style="font - size: 1em">X</p>';
    const reactElement = parse(html) as JSX.Element;
    expect(render(reactElement)).toBe('<p>X</p>');
  });
});
