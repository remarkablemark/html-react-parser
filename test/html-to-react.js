const assert = require('assert');
const React = require('react');
const Parser = require('../');
const { data, render } = require('./helpers/');

describe('html-to-react', () => {
  describe('parser', () => {
    [undefined, null, {}, [], 42].forEach(value => {
      it(`throws an error if first argument is ${value}`, () => {
        assert.throws(() => {
          Parser(value);
        }, TypeError);
      });
    });

    it('returns string if it cannot be parsed as HTML', () => {
      assert.equal(Parser('foo'), 'foo');
    });

    it('converts single HTML element to React', () => {
      const html = data.html.single;
      const reactElement = Parser(html);
      assert.equal(render(reactElement), html);
    });

    it('converts single HTML element and ignores comment', () => {
      const html = data.html.single;
      // comment should be ignored
      const reactElement = Parser(html + data.html.comment);
      assert.equal(render(reactElement), html);
    });

    it('converts multiple HTML elements to React', () => {
      const html = data.html.multiple;
      const reactElements = Parser(html);
      assert.equal(
        render(React.createElement('div', {}, reactElements)),
        '<div>' + html + '</div>'
      );
    });

    it('converts complex HTML to React', () => {
      const html = data.html.complex;
      const reactElement = Parser(data.html.doctype + html);
      assert.equal(render(reactElement), html);
    });

    it('converts empty <script> to React', () => {
      const html = '<script></script>';
      const reactElement = Parser(html);
      assert.equal(render(reactElement), html);
    });

    it('converts empty <style> to React', () => {
      const html = '<style></style>';
      const reactElement = Parser(html);
      assert.equal(render(reactElement), html);
    });

    it('converts SVG to React', () => {
      const svg = data.svg.complex;
      const reactElement = Parser(svg);
      assert.equal(render(reactElement), svg);
    });

    it('decodes HTML entities', () => {
      const encodedEntities = 'asdf &amp; &yuml; &uuml; &apos;';
      const decodedEntities = "asdf & ÿ ü '";
      const reactElement = Parser('<i>' + encodedEntities + '</i>');
      assert.equal(reactElement.props.children, decodedEntities);
    });
  });

  describe('options', () => {
    describe('replace', () => {
      it('overrides the element if replace is valid', () => {
        const html = data.html.complex;
        const reactElement = Parser(html, {
          replace: node => {
            if (node.name === 'title') {
              return React.createElement('title', {}, 'Replaced Title');
            }
          }
        });
        assert.equal(
          render(reactElement),
          html.replace('<title>Title</title>', '<title>Replaced Title</title>')
        );
      });

      it('does not override the element if replace is invalid', () => {
        const html = data.html.complex;
        const reactElement = Parser(html, {
          replace: node => {
            if (node.attribs && node.attribs.id === 'header') {
              return {
                type: 'h1',
                props: { children: 'Heading' }
              };
            }
          }
        });
        assert.notEqual(
          render(reactElement),
          html.replace(
            '<header id="header">Header</header>',
            '<h1>Heading</h1>'
          )
        );
      });
    });
  });
});
