const React = require('react');
const htmlToDOM = require('html-dom-parser');
const domToReact = require('../lib/dom-to-react');
const { data, render } = require('./helpers/');
const utilities = require('../lib/utilities');

describe('DOM to React', () => {
  it('converts single DOM node to React', () => {
    const html = data.html.single;
    const reactElement = domToReact(htmlToDOM(html));

    expect(reactElement).toMatchSnapshot();
  });

  it('converts multiple DOM nodes to React', () => {
    const html = data.html.multiple;
    const reactElements = domToReact(htmlToDOM(html));

    reactElements.forEach((reactElement, index) => {
      expect(reactElement.key).toBe(String(index));
    });

    expect(reactElements).toMatchSnapshot();
  });

  // https://reactjs.org/docs/forms.html#the-textarea-tag
  it('converts <textarea> correctly', () => {
    const html = data.html.textarea;
    const reactElement = domToReact(htmlToDOM(html));

    expect(reactElement).toMatchSnapshot();
  });

  it('does not escape <script> content', () => {
    const html = data.html.script;
    const reactElement = domToReact(htmlToDOM(html));

    expect(reactElement).toMatchSnapshot();
  });

  it('does not escape <style> content', () => {
    const html = data.html.style;
    const reactElement = domToReact(htmlToDOM(html));

    expect(reactElement).toMatchSnapshot();
  });

  it('does not have `children` for void elements', () => {
    const html = data.html.img;
    const reactElement = domToReact(htmlToDOM(html));

    expect(reactElement.props.children).toBe(null);
  });

  it('does not throw an error for void elements', () => {
    const html = data.html.void;
    const reactElements = domToReact(htmlToDOM(html));
    expect(() => {
      render(React.createElement('div', {}, reactElements));
    }).not.toThrow();
  });

  it('skips doctype and comments', () => {
    const html = [
      data.html.doctype,
      data.html.single,
      data.html.comment,
      data.html.single
    ].join('');
    const reactElements = domToReact(htmlToDOM(html));

    expect(reactElements).toHaveLength(2);
    expect(reactElements[0].key).toBe('1');
    expect(reactElements[1].key).toBe('3');
    expect(reactElements).toMatchSnapshot();
  });

  it('converts SVG element with viewBox attribute', () => {
    const html = data.svg.simple;
    const reactElement = domToReact(
      htmlToDOM(html, { lowerCaseAttributeNames: false })
    );

    expect(reactElement).toMatchSnapshot();
  });

  it('does not modify attributes on custom elements', () => {
    const html = data.html.customElement;
    const reactElement = domToReact(htmlToDOM(html));

    expect(reactElement).toMatchSnapshot();
  });

  describe('library', () => {
    const Preact = require('preact');

    it('converts with React (default)', () => {
      const reactElement = domToReact(htmlToDOM(data.html.single));

      expect(React.isValidElement(reactElement)).toBe(true);
      expect(Preact.isValidElement(reactElement)).toBe(false);

      expect(reactElement).toEqual(React.createElement('p', {}, 'foo'));
    });

    it('converts with Preact instead of React', () => {
      const parsedElement = domToReact(htmlToDOM(data.html.single), {
        library: Preact
      });
      const preactElement = Preact.createElement('p', {}, 'foo');

      expect(React.isValidElement(parsedElement)).toBe(false);
      expect(Preact.isValidElement(parsedElement)).toBe(true);

      // remove `__v` key since it's causing test equality to fail
      delete parsedElement.__v;
      delete preactElement.__v;
      expect(parsedElement).toEqual(preactElement);
    });
  });

  describe('replace', () => {
    it("does not set key if there's a single node", () => {
      const replaceElement = React.createElement('p');
      const reactElement = domToReact(htmlToDOM(data.html.single), {
        replace: () => replaceElement
      });
      expect(reactElement.key).toBe(null);
    });

    it("does not modify keys if it's already set", () => {
      const html = data.html.single + data.html.customElement;

      const reactElements = domToReact(htmlToDOM(html), {
        replace: node => {
          if (node.name === 'p') {
            return React.createElement('p', {}, 'replaced foo');
          }
          if (node.name === 'custom-button') {
            return React.createElement(
              'custom-button',
              {
                key: 'myKey',
                class: 'myClass',
                'custom-attribute': 'replaced value'
              },
              null
            );
          }
        }
      });

      expect(reactElements[0].key).toBe('0');
      expect(reactElements[1].key).toBe('myKey');
    });
  });

  describe('when React >=16', () => {
    it('preserves unknown attributes', () => {
      const html = data.html.customElement;
      const reactElement = domToReact(htmlToDOM(html));

      expect(reactElement).toMatchSnapshot();
    });
  });

  describe('when React <16', () => {
    const { PRESERVE_CUSTOM_ATTRIBUTES } = utilities;

    beforeAll(() => {
      utilities.PRESERVE_CUSTOM_ATTRIBUTES = false;
    });

    afterAll(() => {
      utilities.PRESERVE_CUSTOM_ATTRIBUTES = PRESERVE_CUSTOM_ATTRIBUTES;
    });

    it('removes unknown attributes', () => {
      const html = data.html.customElement;
      const reactElement = domToReact(htmlToDOM(html));

      expect(reactElement).toMatchSnapshot();
    });
  });
});
