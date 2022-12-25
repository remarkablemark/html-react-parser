const React = require('react');
const domhandler = require('domhandler');
const parse = require('..');
const { html, svg } = require('./data');
const { render } = require('./helpers');

describe('module', () => {
  it('exports default', () => {
    expect(parse.default).toBe(parse);
    expect(parse.default).toBeInstanceOf(Function);
  });

  it('exports domToReact', () => {
    expect(parse.domToReact).toBe(require('../lib/dom-to-react'));
    expect(parse.domToReact).toBeInstanceOf(Function);
  });

  it('exports htmlToDOM', () => {
    expect(parse.htmlToDOM).toBe(require('html-dom-parser'));
    expect(parse.htmlToDOM).toBeInstanceOf(Function);
    expect(parse.htmlToDOM.default).toBe(parse.htmlToDOM);
  });

  it('exports attributesToProps', () => {
    expect(parse.attributesToProps).toBe(require('../lib/attributes-to-props'));
    expect(parse.attributesToProps).toBeInstanceOf(Function);
  });

  describe('domhandler', () => {
    it.each(['Comment', 'Element', 'ProcessingInstruction', 'Text'])(
      'exports %s',
      name => {
        expect(parse[name]).toBeInstanceOf(Function);
        expect(parse[name]).toBe(domhandler[name]);
      }
    );
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
    expect(parse(html.single)).toMatchInlineSnapshot(`
      <p>
        foo
      </p>
    `);
  });

  it('parses single HTML element with comment', () => {
    // comment should be ignored
    expect(parse(html.single + html.comment)).toMatchInlineSnapshot(`
      <p>
        foo
      </p>
    `);
  });

  it('parses multiple HTML elements', () => {
    expect(parse(html.multiple)).toMatchInlineSnapshot(`
      [
        <p>
          foo
        </p>,
        <p>
          bar
        </p>,
      ]
    `);
  });

  it('parses complex HTML with doctype', () => {
    expect(parse(html.doctype + html.complex)).toMatchInlineSnapshot(`
      <html>
        <head>
          <meta
            charSet="utf-8"
          />
          <title>
            Title
          </title>
          <link
            href="style.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <header
            id="header"
          >
            Header
          </header>
          <h1
            style={
              {
                "color": "#000",
                "fontSize": "42px",
              }
            }
          >
            Heading
          </h1>
          <hr />
          <p>
            Paragraph
          </p>
          <img
            src="image.jpg"
          />
          <div
            className="class1 class2"
          >
            Some 
            <em>
              text
            </em>
            .
          </div>
          <script
            dangerouslySetInnerHTML={
              {
                "__html": "alert();",
              }
            }
          />
        </body>
      </html>
    `);
  });

  it('parses empty <script>', () => {
    expect(parse('<script></script>')).toMatchInlineSnapshot(`<script />`);
  });

  it('parses empty <style>', () => {
    expect(parse('<style></style>')).toMatchInlineSnapshot(`<style />`);
  });

  it('parses form', () => {
    expect(parse(html.form)).toMatchInlineSnapshot(`
      <input
        defaultChecked={true}
        defaultValue="foo"
        type="text"
      />
    `);
  });

  it('parses SVG', () => {
    expect(parse(svg.complex)).toMatchInlineSnapshot(`
      <svg
        height="400"
        width="450"
      >
        <path
          d="M 100 350 l 150 -300"
          fill="none"
          id="lineAB"
          stroke="red"
          strokeWidth="3"
        />
        <g
          fill="black"
          stroke="black"
          strokeWidth="3"
        >
          <circle
            cx="100"
            cy="350"
            id="pointA"
            r="3"
          />
        </g>
        <g
          fill="black"
          fontFamily="sans-serif"
          fontSize="30"
          stroke="none"
          textAnchor="middle"
        >
          <text
            dx="-30"
            x="100"
            y="350"
          >
            A
          </text>
        </g>
        Your browser does not support inline SVG.
      </svg>
    `);
  });

  it('decodes HTML entities', () => {
    const encodedEntities = 'asdf &amp; &yuml; &uuml; &apos;';
    const decodedEntities = "asdf & ÿ ü '";
    const reactElement = parse('<i>' + encodedEntities + '</i>');
    expect(reactElement.props.children).toBe(decodedEntities);
  });

  it('escapes tags inside of <title>', () => {
    expect(parse(html.title)).toMatchInlineSnapshot(`
      <title>
        &lt;em&gt;text&lt;/em&gt;
      </title>
    `);
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
    expect(parse(html.complex, options)).toMatchInlineSnapshot(`
      <html>
        <head>
          <meta
            charSet="utf-8"
          />
          <title>
            Replaced Title
          </title>
          <link
            href="style.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <header
            id="header"
          >
            Header
          </header>
          <h1
            style={
              {
                "color": "#000",
                "fontSize": "42px",
              }
            }
          >
            Heading
          </h1>
          <hr />
          <p>
            Paragraph
          </p>
          <img
            src="image.jpg"
          />
          <div
            className="class1 class2"
          >
            Some 
            <em>
              text
            </em>
            .
          </div>
          <script
            dangerouslySetInnerHTML={
              {
                "__html": "alert();",
              }
            }
          />
        </body>
      </html>
    `);
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
    expect(parse(html.complex, options)).toMatchInlineSnapshot(`
      <html>
        <head>
          <meta
            charSet="utf-8"
          />
          <title>
            Title
          </title>
          <link
            href="style.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <header
            id="header"
          >
            Header
          </header>
          <h1
            style={
              {
                "color": "#000",
                "fontSize": "42px",
              }
            }
          >
            Heading
          </h1>
          <hr />
          <p>
            Paragraph
          </p>
          <img
            src="image.jpg"
          />
          <div
            className="class1 class2"
          >
            Some 
            <em>
              text
            </em>
            .
          </div>
          <script
            dangerouslySetInnerHTML={
              {
                "__html": "alert();",
              }
            }
          />
        </body>
      </html>
    `);
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
    expect(parse('<ul><li/><li/></ul>', options)).toMatchInlineSnapshot(`
      <ul>
        <li />
        <li />
      </ul>
    `);
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
