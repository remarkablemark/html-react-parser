import parse, {
  HTMLReactParserOptions,
  domToReact,
  htmlToDOM
} from 'html-react-parser';
import * as React from 'react';

// $ExpectError
parse();

// $ExpectType Element | Element[]
parse('');

// $ExpectType Element | Element[]
parse('string');

// $ExpectType Element | Element[]
parse('<p>text</p>');

// $ExpectType Element | Element[]
parse('<li>1</li><li>2</li>');

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

// $ExpectType Element | Element[]
parse('<hr>', {
  library: {
    cloneElement: (element, props, children) =>
      React.cloneElement(element, props, children),
    createElement: (type, props, children) =>
      React.createElement(type, props, children),
    isValidElement: element => React.isValidElement(element)
  }
});

// $ExpectType Element | Element[]
parse('<p/><p/>', {
  htmlparser2: {
    xmlMode: true,
    decodeEntities: true,
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
    recognizeCDATA: true,
    recognizeSelfClosing: true
  }
});

// $ExpectType DomElement[]
const domNodes = htmlToDOM('<div>text</div>');

// $ExpectType Element | Element[]
domToReact(domNodes);
