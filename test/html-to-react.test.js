const React = require('react');
const parse = require('..');
const { data, render } = require('./helpers/');

describe('HTML to React', () => {
  describe('exports', () => {
    it('has default ES Module', () => {
      expect(parse.default).toBe(parse);
    });

    it('has domToReact', () => {
      expect(parse.domToReact).toBe(require('../lib/dom-to-react'));
    });

    it('has htmlToDOM', () => {
      expect(parse.htmlToDOM).toBe(require('html-dom-parser'));
    });

    it('has attributesToProps', () => {
      expect(parse.attributesToProps).toBe(
        require('../lib/attributes-to-props')
      );
    });
  });

  describe('parser', () => {
    it.each([undefined, null, {}, [], 0, 1, () => {}, new Date()])(
      'throws an error if first argument is %p',
      input => {
        expect(() => {
          parse(input);
        }).toThrow(TypeError);
      }
    );

    it('converts empty string to empty array', () => {
      expect(parse('')).toEqual([]);
    });

    it('returns string if it cannot be parsed as HTML', () => {
      expect(parse('foo')).toBe('foo');
    });

    it('converts single HTML element to React', () => {
      const html = data.html.single;
      const reactElement = parse(html);

      expect(render(reactElement)).toBe(html);
    });

    it('converts single HTML element and ignores comment', () => {
      const html = data.html.single;
      // comment should be ignored
      const reactElement = parse(html + data.html.comment);

      expect(render(reactElement)).toBe(html);
    });

    it('converts multiple HTML elements to React', () => {
      const html = data.html.multiple;
      const reactElements = parse(html);

      expect(
        render(React.createElement(React.Fragment, {}, reactElements))
      ).toBe(html);
    });

    it('converts complex HTML to React', () => {
      const html = data.html.complex;
      const reactElement = parse(data.html.doctype + html);

      expect(render(reactElement)).toBe(html);
    });

    it('converts empty <script> to React', () => {
      const html = '<script></script>';
      const reactElement = parse(html);

      expect(render(reactElement)).toBe(html);
    });

    it('converts empty <style> to React', () => {
      const html = '<style></style>';
      const reactElement = parse(html);

      expect(render(reactElement)).toBe(html);
    });

    it('converts SVG to React', () => {
      const svg = data.svg.complex;
      const reactElement = parse(svg);

      expect(render(reactElement)).toBe(svg);
    });

    it('decodes HTML entities', () => {
      const encodedEntities = 'asdf &amp; &yuml; &uuml; &apos;';
      const decodedEntities = "asdf & ÿ ü '";
      const reactElement = parse('<i>' + encodedEntities + '</i>');

      expect(reactElement.props.children).toBe(decodedEntities);
    });
  });

  describe('options', () => {
    describe('replace', () => {
      it('overrides the element if a valid React element is returned', () => {
        const html = data.html.complex;
        const reactElement = parse(html, {
          replace: node => {
            if (node.name === 'title') {
              return React.createElement('title', {}, 'Replaced Title');
            }
          }
        });

        expect(render(reactElement)).toBe(
          html.replace('<title>Title</title>', '<title>Replaced Title</title>')
        );
      });

      it('does not override the element if an invalid React element is returned', () => {
        const html = data.html.complex;
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
        const reactElement = parse(html, options);

        expect(render(reactElement)).toBe(html);
      });

      it('use attributesToProps to converts attributes to React props', () => {
        const { attributesToProps } = parse;
        const html = data.html.attributes;

        let props;
        const options = {
          replace: node => {
            if (node.attribs && node.name === 'hr') {
              props = attributesToProps(node.attribs);
              return {
                type: 'hr',
                props
              };
            }
          }
        };
        const reactElement = parse(html, options);

        expect(props).toEqual({
          id: 'foo',
          className: 'bar baz',
          style: {
            background: '#fff',
            textAlign: 'center'
          },
          ['data-foo']: 'bar'
        });
        expect(render(reactElement)).toBe(html);
      });
    });

    describe('library', () => {
      const Preact = require('preact');

      it('converts with Preact instead of React', () => {
        const parsedElement = parse(data.html.single, { library: Preact });
        const preactElement = Preact.createElement('p', {}, 'foo');

        expect(React.isValidElement(parsedElement)).toBe(false);
        expect(Preact.isValidElement(parsedElement)).toBe(true);

        // remove `__v` key since it's causing test equality to fail
        delete parsedElement.__v;
        delete preactElement.__v;
        expect(parsedElement).toEqual(preactElement);
      });
    });

    describe('htmlparser2', () => {
      it('parses XHTML with xmlMode enabled', () => {
        // using self-closing syntax (`/>`) for non-void elements is invalid
        // which causes elements to nest instead of being rendered correctly
        // enabling htmlparser2 option xmlMode resolves this issue
        const html = '<ul><li/><li/></ul>';
        const options = { htmlparser2: { xmlMode: true } };
        const reactElements = parse(html, options);

        expect(render(reactElements)).toBe('<ul><li></li><li></li></ul>');
      });
    });

    describe('trim', () => {
      it('preserves whitespace text nodes when disabled (default)', () => {
        const html = `<table>
  <tbody>
  </tbody>
</table>`;
        const reactElement = parse(html);

        expect(render(reactElement)).toBe(html);
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
  });
});
