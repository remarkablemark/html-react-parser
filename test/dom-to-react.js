const assert = require('assert');
const React = require('react');
const htmlToDOM = require('html-dom-parser');
const domToReact = require('../lib/dom-to-react');
const { data, render } = require('./helpers/');

describe('dom-to-react parser', () => {
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
});
