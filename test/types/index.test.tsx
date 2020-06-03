import parse, {
  HTMLReactParserOptions,
  domToReact,
  htmlToDOM
} from 'html-react-parser';
import * as React from 'react';

// $ExpectType Element | Element[]
parse('<p>text</p>');

// $ExpectType Element | Element[]
parse('<br id="replace">', {
  replace: domNode => {
    if (domNode.attribs && domNode.attribs.id === 'replace') {
      return <span>replaced</span>;
    }
  }
});

// $ExpectType Element | Element[]
parse('<br id="remove">', {
  replace({ attribs }) {
    return attribs && attribs.id === 'remove' && <></>;
  }
});

let options: HTMLReactParserOptions;

options = {
  replace: node => {
    if (node.attribs && node.attribs.id === 'header') {
      return;
    }
  }
};

// $ExpectType Element | Element[]
parse('<a id="header" href="#">Heading</a>', options);

// $ExpectType DomElement[]
const domNodes = htmlToDOM('<div>text</div>');

// $ExpectType Element | Element[]
domToReact(domNodes);
