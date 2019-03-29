import parse, { HTMLReactParserOptions } from 'html-react-parser';
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
const options: HTMLReactParserOptions = {
  replace({ attribs }) {
    return attribs && attribs.id === 'remove' && <React.Fragment />;
  }
};

parse('<p><br id="remove"></p>', options);

// Return domhandler node
parse('<a id="header" href="#">Heading</a>', {
  replace: node => {
    if (node.attribs && node.attribs.id === 'header') {
      return {
        type: 'h1',
        props: { children: 'Heading' }
      };
    }
  }
});
