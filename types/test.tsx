import parse from 'html-dom-parser';
import * as React from 'react';

// $ExpectType string | DetailedReactHTMLElement<{}, HTMLElement> | DetailedReactHTMLElement<{}, HTMLElement>[]
parse('<div>text</div>');

// `options.replace`

// Return React.createElement from `replace`
parse('<p id="replace">text</p>', {
  replace: domNode => {
    if (domNode.attribs && domNode.attribs.id === 'replace') {
      return React.createElement('span', {}, 'replaced');
    }
  }
});

// Return ReactElement
parse('<p><br id="remove"></p>', {
  replace: ({ attribs }) =>
    attribs && attribs.id === 'remove' && <React.Fragment />
});

// Return domhandler node
parse('<a href="#">Heading</a>', {
  replace: node => {
    if (node.attribs && node.attribs.id === 'header') {
      return {
        type: 'h1',
        props: { children: 'Heading' }
      };
    }
  }
});
