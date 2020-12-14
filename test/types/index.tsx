import parse, {
  HTMLReactParserOptions,
  domToReact,
  htmlToDOM
} from 'html-react-parser';
import { Element } from 'domhandler';
import * as React from 'react';

// $ExpectError
parse();

// $ExpectType string | Element | Element[]
parse('');

// $ExpectType string | Element | Element[]
parse('string');

// $ExpectType string | Element | Element[]
parse('<p>text</p>');

// $ExpectType string | Element | Element[]
parse('<li>1</li><li>2</li>');

// $ExpectType string | Element | Element[]
parse('<br id="replace">', {
  replace: domNode => {
    if (domNode instanceof Element && domNode.attribs.id === 'replace') {
      return <span>replaced</span>;
    }
  }
});

// $ExpectType string | Element | Element[]
parse('<br id="remove">', {
  replace: domNode => {
    if (domNode instanceof Element && domNode.attribs.id === 'remove') {
      return <></>;
    }
  }
});

const options: HTMLReactParserOptions = {
  replace: domNode => {
    if (domNode instanceof Element && domNode.attribs.id === 'header') {
      return;
    }
  }
};

// $ExpectType string | Element | Element[]
parse('<a id="header" href="#">Heading</a>', options);

// $ExpectType string | Element | Element[]
parse('<hr>', {
  library: {
    cloneElement: (element, props, children) =>
      React.cloneElement(element, props, children),
    createElement: (type, props, children) =>
      React.createElement(type, props, children),
    isValidElement: element => React.isValidElement(element)
  }
});

// $ExpectType string | Element | Element[]
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

// $ExpectType string | Element | Element[]
parse('\t<p>text \r</p>\n', { trim: true });

// $ExpectType DOMNode[]
const domNodes = htmlToDOM('<div>text</div>');

// $ExpectType string | Element | Element[]
domToReact(domNodes);
