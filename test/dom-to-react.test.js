const assert = require('assert');
const React = require('react');
const htmlToDOM = require('html-dom-parser');
const domToReact = require('../lib/dom-to-react');
const { data, render } = require('./helpers/');
const utilities = require('../lib/utilities');

describe('DOM to React', () => {
  it('converts single DOM node to React', () => {
    const html = data.html.single;
    const reactElement = domToReact(htmlToDOM(html));

    assert(React.isValidElement(reactElement));
    expect(reactElement).toMatchSnapshot();
  });

  it('converts multiple DOM nodes to React', () => {
    const html = data.html.multiple;
    const reactElements = domToReact(htmlToDOM(html));

    reactElements.forEach(reactElement => {
      assert(React.isValidElement(reactElement));
      assert(reactElement.key);
    });

    expect(reactElements).toMatchSnapshot();
  });

  // https://reactjs.org/docs/forms.html#the-textarea-tag
  it('converts <textarea> correctly', () => {
    const html = data.html.textarea;
    const reactElement = domToReact(htmlToDOM(html));

    assert(React.isValidElement(reactElement));
    expect(reactElement).toMatchSnapshot();
  });

  it('does not escape <script> content', () => {
    const html = data.html.script;
    const reactElement = domToReact(htmlToDOM(html));

    assert(React.isValidElement(reactElement));
    expect(reactElement).toMatchSnapshot();
  });

  it('does not escape <style> content', () => {
    const html = data.html.style;
    const reactElement = domToReact(htmlToDOM(html));

    assert(React.isValidElement(reactElement));
    expect(reactElement).toMatchSnapshot();
  });

  it('does not have `children` for void elements', () => {
    const html = data.html.img;
    const reactElement = domToReact(htmlToDOM(html));
    assert(!reactElement.props.children);
  });

  it('does not throw an error for void elements', () => {
    const html = data.html.void;
    const reactElements = domToReact(htmlToDOM(html));
    assert.doesNotThrow(() => {
      render(React.createElement('div', {}, reactElements));
    });
  });

  it('skips doctype and comments', () => {
    const html = [
      data.html.doctype,
      data.html.single,
      data.html.comment,
      data.html.single
    ].join('');

    const reactElements = domToReact(htmlToDOM(html));
    reactElements.forEach((reactElement, index) => {
      assert.strictEqual(React.isValidElement(reactElement), true);
      assert(reactElement.key, String(index));
    });

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
      const html = data.html.single;
      const reactElement = domToReact(htmlToDOM(html));

      assert.deepEqual(reactElement, React.createElement('p', {}, 'foo'));
    });

    it('converts with Preact instead of React', () => {
      const html = data.html.single;
      const preactElement = domToReact(htmlToDOM(html), { library: Preact });

      assert.deepEqual(preactElement, Preact.createElement('p', {}, 'foo'));
    });
  });

  describe('replace', () => {
    it("does not set key if there's a single node", () => {
      const replaceElement = React.createElement('p');
      const reactElement = domToReact(htmlToDOM(data.html.single), {
        replace: () => replaceElement
      });
      assert.strictEqual(reactElement.key, null);
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

      assert.strictEqual(reactElements[0].key, '0');
      assert.strictEqual(reactElements[1].key, 'myKey');
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
