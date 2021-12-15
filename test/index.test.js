const React = require('react');
const parse = require('..');
const { html, svg } = require('./data');
const { render } = require('./helpers');

describe('module', () => {
  it('exports default', () => {
    expect(parse.default).toBe(parse);
  });

  it('exports domToReact', () => {
    expect(parse.domToReact).toBe(require('../lib/dom-to-react'));
  });

  it('exports htmlToDOM', () => {
    expect(parse.htmlToDOM).toBe(require('html-dom-parser'));
  });

  it('exports attributesToProps', () => {
    expect(parse.attributesToProps).toBe(require('../lib/attributes-to-props'));
  });
});

describe('HTMLReactParser', () => {
  it.each([undefined, null, {}, [], true, false, 0, 1, () => {}, new Date()])(
    'throws error for value: %p',
    value => {
      expect(() => {
        parse(value);
      }).toThrow(TypeError);
    }
  );

  it('parses "" to []', () => {
    expect(parse('')).toEqual([]);
  });

  it("returns string if it's not HTML", () => {
    const string = 'text';
    expect(parse(string)).toBe(string);
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

  it('parses SVG', () => {
    expect(parse(svg.complex)).toMatchSnapshot();
  });

  it('decodes HTML entities', () => {
    const encodedEntities = 'asdf &amp; &yuml; &uuml; &apos;';
    const decodedEntities = "asdf & ÿ ü '";
    const reactElement = parse('<i>' + encodedEntities + '</i>');
    expect(reactElement.props.children).toBe(decodedEntities);
  });

  it('escapes tags inside of <title>', () => {
    expect(parse(html.title)).toMatchSnapshot();
  });
});

describe('replace option', () => {
  it('replaces the element if a valid React element is returned', () => {
    const options = {
      replace: node => {
        if (node.name === 'title') {
          return React.createElement('title', {}, 'Replaced Title');
        }
      }
    };
    expect(parse(html.complex, options)).toMatchSnapshot();
  });

  it('does not replace the element if an invalid React element is returned', () => {
    const options = {
      replace: node => {
        if (node.attribs && node.attribs.id === 'header') {
          return {
            type: 'h1',
            props: { children: 'Heading' }
          };
        }
      }
    };
    expect(parse(html.complex, options)).toMatchSnapshot();
  });
});

describe('library option', () => {
  const Preact = require('preact');

  it('converts with Preact instead of React', () => {
    const parsedElement = parse(html.single, { library: Preact });
    const preactElement = Preact.createElement('p', {}, 'foo');
    expect(React.isValidElement(parsedElement)).toBe(false);
    expect(Preact.isValidElement(parsedElement)).toBe(true);
    // remove `__v` key since it's causing test equality to fail
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
    const reactElement = parse(html);
    expect(render(reactElement)).toBe(
      '<table><tbody><tr><td>hello</td><td>\n</td><td>\u00a0</td></tr></tbody></table>'
    );
    expect(reactElement).toMatchInlineSnapshot(`
      <table>
        <tbody>
          <tr>
            <td>
              hello
            </td>
            <td>
              

            </td>
            <td>
              \u00a0
            </td>
          </tr>
        </tbody>
      </table>
    `);
  });

  it('removes whitespace text nodes when enabled', () => {
    const html = `<table>
      <tbody><tr><td> text </td><td> </td>\t</tr>\r</tbody>\n</table>`;
    const options = { trim: true };
    const reactElement = parse(html, options);
    expect(render(reactElement)).toBe(
      '<table><tbody><tr><td> text </td><td></td></tr></tbody></table>'
    );
  });
});

describe('invalid styles', () => {
  it('copes with invalid styles', () => {
    const html = '<p style="font - size: 1em">X</p>';
    const options = {};
    const reactElement = parse(html, options);
    expect(render(reactElement)).toBe('<p>X</p>');
  });
});
