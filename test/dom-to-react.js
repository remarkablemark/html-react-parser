const assert = require('assert');
const React = require('react');
const htmlToDOM = require('html-dom-parser');
const domToReact = require('../lib/dom-to-react');
const { data, render } = require('./helpers/');
const utilities = require('../lib/utilities');

describe('dom-to-react parser', () => {
  let actualReactVersion;
  beforeEach(() => {
    actualReactVersion = React.version;
  });

  afterEach(() => {
    React.version = actualReactVersion;
  });

  it('converts single DOM node to React', () => {
    const html = data.html.single;
    const reactElement = domToReact(htmlToDOM(html));

    assert(React.isValidElement(reactElement));
    assert.deepEqual(reactElement, React.createElement('p', {}, 'foo'));
  });

  it('converts multiple DOM nodes to React', () => {
    const html = data.html.multiple;
    const reactElements = domToReact(htmlToDOM(html));

    reactElements.forEach(reactElement => {
      assert(React.isValidElement(reactElement));
      assert(reactElement.key);
    });

    assert.deepEqual(reactElements, [
      React.createElement('p', { key: 0 }, 'foo'),
      React.createElement('p', { key: 1 }, 'bar')
    ]);
  });

  // https://facebook.github.io/react/docs/forms.html#why-textarea-value
  it('converts <textarea> correctly', () => {
    const html = data.html.textarea;
    const reactElement = domToReact(htmlToDOM(html));

    assert(React.isValidElement(reactElement));
    assert.deepEqual(
      reactElement,
      React.createElement(
        'textarea',
        {
          defaultValue: 'foo'
        },
        null
      )
    );
  });

  it('does not escape <script> content', () => {
    const html = data.html.script;
    const reactElement = domToReact(htmlToDOM(html));

    assert(React.isValidElement(reactElement));
    assert.deepEqual(
      reactElement,
      React.createElement(
        'script',
        {
          dangerouslySetInnerHTML: {
            __html: 'alert(1 < 2);'
          }
        },
        null
      )
    );
  });

  it('does not escape <style> content', () => {
    const html = data.html.style;
    const reactElement = domToReact(htmlToDOM(html));

    assert(React.isValidElement(reactElement));
    assert.deepEqual(
      reactElement,
      React.createElement(
        'style',
        {
          dangerouslySetInnerHTML: {
            __html: 'body > .foo { color: #f00; }'
          }
        },
        null
      )
    );
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
    reactElements.forEach(reactElement => {
      assert(React.isValidElement(reactElement));
      assert(reactElement.key);
    });

    assert.deepEqual(reactElements, [
      // doctype
      React.createElement('p', { key: 1 }, 'foo'),
      // comment is in the middle
      React.createElement('p', { key: 3 }, 'foo')
    ]);
  });

  it("handles svg's with a viewBox", () => {
    const html = data.svg.simple;
    const reactElement = domToReact(
      htmlToDOM(html, { lowerCaseAttributeNames: false })
    );

    assert.deepEqual(
      reactElement,
      React.createElement('svg', { viewBox: '0 0 512 512', id: 'foo' }, 'Inner')
    );
  });

  it('does not modify attributes on custom elements', () => {
    const html = data.html.customElement;
    const reactElement = domToReact(htmlToDOM(html));

    assert.deepEqual(
      reactElement,
      React.createElement(
        'custom-button',
        {
          class: 'myClass',
          'custom-attribute': 'value'
        },
        null
      )
    );
  });

  it('does not modify keys for replacement if it have one', () => {
    const html = [data.html.single, data.html.customElement].join('');

    const reactElements = domToReact(htmlToDOM(html), {
      replace: node => {
        if (node.name === 'p') {
          return React.createElement('p', {}, 'replaced foo');
        }
        if (node.name === 'custom-button') {
          return React.createElement(
            'custom-button',
            {
              key: 'meyKey',
              class: 'myClass',
              'custom-attribute': 'replaced value'
            },
            null
          );
        }
      }
    });

    assert.deepEqual(reactElements, [
      React.createElement('p', { key: 0 }, 'replaced foo'),
      React.createElement(
        'custom-button',
        {
          key: 'meyKey',
          class: 'myClass',
          'custom-attribute': 'replaced value'
        },
        null
      )
    ]);
  });

  describe('when React <16', () => {
    const { PRESERVE_CUSTOM_ATTRIBUTES } = utilities;

    before(() => {
      utilities.PRESERVE_CUSTOM_ATTRIBUTES = false;
    });

    after(() => {
      utilities.PRESERVE_CUSTOM_ATTRIBUTES = PRESERVE_CUSTOM_ATTRIBUTES;
    });

    it('modifies attributes on custom elements', () => {
      const html = data.html.customElement;
      const reactElement = domToReact(htmlToDOM(html));

      assert.deepEqual(
        reactElement,
        React.createElement('custom-button', { className: 'myClass' }, null)
      );
    });
  });
});
