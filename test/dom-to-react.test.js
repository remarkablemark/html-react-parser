const React = require('react');
const htmlToDOM = require('html-dom-parser');

const domToReact = require('../lib/dom-to-react');
const utilities = require('../lib/utilities');

const { render } = require('./helpers');
const { html, svg } = require('./data');

describe('domToReact', () => {
  it.each([
    ['comment', html.comment],
    ['doctype', html.doctype]
  ])('skips %s', (type, value) => {
    expect(domToReact(htmlToDOM(value))).toEqual([]);
  });

  it('converts "text" to "text"', () => {
    const text = 'text';
    expect(domToReact(htmlToDOM(text))).toBe(text);
  });

  it('converts single DOM node to React', () => {
    const reactElement = domToReact(htmlToDOM(html.single));
    expect(reactElement).toMatchInlineSnapshot(`
      <p>
        foo
      </p>
    `);
  });

  it('converts multiple DOM nodes to React', () => {
    const reactElements = domToReact(htmlToDOM(html.multiple));
    reactElements.forEach((reactElement, index) => {
      expect(reactElement.key).toBe(String(index));
    });
    expect(reactElements).toMatchInlineSnapshot(`
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

  it('converts <textarea> correctly', () => {
    // https://reactjs.org/docs/forms.html#the-textarea-tag
    const reactElement = domToReact(htmlToDOM(html.textarea));
    expect(reactElement).toMatchInlineSnapshot(`
      <textarea
        defaultValue="foo"
      />
    `);
  });

  it('does not escape <script> content', () => {
    const reactElement = domToReact(htmlToDOM(html.script));
    expect(reactElement).toMatchInlineSnapshot(`
      <script
        dangerouslySetInnerHTML={
          {
            "__html": "alert(1 < 2);",
          }
        }
      />
    `);
  });

  it('does not escape <style> content', () => {
    const reactElement = domToReact(htmlToDOM(html.style));
    expect(reactElement).toMatchInlineSnapshot(`
      <style
        dangerouslySetInnerHTML={
          {
            "__html": "body > .foo { color: #f00; }",
          }
        }
      />
    `);
  });

  it('does not have `children` for void elements', () => {
    const reactElement = domToReact(htmlToDOM(html.img));
    expect(reactElement.props.children).toBe(null);
  });

  it('does not throw an error for void elements', () => {
    const reactElements = domToReact(htmlToDOM(html.void));
    expect(() => {
      render(React.createElement('div', {}, reactElements));
    }).not.toThrow();
  });

  it('skips doctype and comments', () => {
    const reactElements = domToReact(
      htmlToDOM(html.doctype + html.single + html.comment + html.single)
    );
    expect(reactElements).toHaveLength(2);
    expect(reactElements[0].key).toBe('1');
    expect(reactElements[1].key).toBe('3');
    expect(reactElements).toMatchInlineSnapshot(`
      [
        <p>
          foo
        </p>,
        <p>
          foo
        </p>,
      ]
    `);
  });

  it('converts SVG element with viewBox attribute', () => {
    const reactElement = domToReact(
      htmlToDOM(svg.simple, { lowerCaseAttributeNames: false })
    );
    expect(reactElement).toMatchInlineSnapshot(`
      <svg
        id="foo"
        viewBox="0 0 512 512"
      >
        Inner
      </svg>
    `);
  });

  it('converts custom element with attributes', () => {
    const reactElement = domToReact(htmlToDOM(html.customElement));
    expect(reactElement).toMatchInlineSnapshot(`
      <custom-element
        class="myClass"
        custom-attribute="value"
        style={
          {
            "OTransition": "all .5s",
            "lineHeight": "1",
          }
        }
      />
    `);
  });
});

describe('domToReact with library option', () => {
  const Preact = require('preact');

  it('converts with React by default', () => {
    const reactElement = domToReact(htmlToDOM(html.single));
    expect(React.isValidElement(reactElement)).toBe(true);
    expect(Preact.isValidElement(reactElement)).toBe(false);
    expect(reactElement).toEqual(React.createElement('p', {}, 'foo'));
  });

  it('converts with Preact', () => {
    const parsedElement = domToReact(htmlToDOM(html.single), {
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

describe('domToReact replace option', () => {
  it("does not set key if there's a single node", () => {
    const replaceElement = React.createElement('p');
    const reactElement = domToReact(htmlToDOM(html.single), {
      replace: () => replaceElement
    });
    expect(reactElement.key).toBe(null);
  });

  it("does not modify keys if they're already set", () => {
    const options = {
      replace: node => {
        if (node.name === 'p') {
          return React.createElement('p', {}, 'replaced foo');
        }
        if (node.name === 'custom-element') {
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
    };

    const reactElements = domToReact(
      htmlToDOM(html.single + html.customElement),
      options
    );
    expect(reactElements[0].key).toBe('0');
    expect(reactElements[1].key).toBe('myKey');
  });
});

describe('domToReact', () => {
  describe('when React >=16', () => {
    it('preserves unknown attributes', () => {
      const reactElement = domToReact(htmlToDOM(html.customElement));
      expect(reactElement).toMatchInlineSnapshot(`
        <custom-element
          class="myClass"
          custom-attribute="value"
          style={
            {
              "OTransition": "all .5s",
              "lineHeight": "1",
            }
          }
        />
      `);
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
      const reactElement = domToReact(htmlToDOM(html.customElement));
      expect(reactElement).toMatchInlineSnapshot(`
        <custom-element
          className="myClass"
          style={
            {
              "OTransition": "all .5s",
              "lineHeight": "1",
            }
          }
        />
      `);
    });
  });
});
