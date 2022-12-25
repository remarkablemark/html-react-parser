import parse, {
  Element,
  HTMLReactParserOptions,
  domToReact
} from 'html-react-parser';
import * as React from 'react';

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

let options: HTMLReactParserOptions;

options = {
  replace: domNode => {
    if (domNode instanceof Element && domNode.attribs.id === 'header') {
      return;
    }
  }
};

options = {
  replace: domNode => {
    if (domNode instanceof Element) {
      return <>{domToReact(domNode.children)}</>;
    }
  }
};

// $ExpectType string | Element | Element[]
parse('<a id="header" href="#">Heading</a>', options);
