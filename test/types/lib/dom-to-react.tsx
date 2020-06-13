import { DomElement } from 'domhandler';
import { HTMLReactParserOptions } from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import * as React from 'react';
import htmlToDOM from 'html-dom-parser';

// $ExpectType DomElement[]
htmlToDOM('<div>text</div>');

// $ExpectType Element | Element[]
domToReact(htmlToDOM('<div>text</div>'));

// $ExpectType Element | Element[]
domToReact(htmlToDOM('<p id="replace">text</p>'), {
  replace: domNode => {
    if (domNode.attribs && domNode.attribs.id === 'replace') {
      return <span>replaced</span>;
    }
  }
});

let options: HTMLReactParserOptions;

options = {
  replace({ attribs }) {
    return attribs && attribs.id === 'remove' && <></>;
  }
};

// $ExpectType Element | Element[]
domToReact(htmlToDOM('<p><br id="remove"></p>'), options);

// $ExpectType Element | Element[]
domToReact(htmlToDOM('<a id="header" href="#">Heading</a>'), {
  replace: node => {
    if (node.attribs && node.attribs.id === 'header') {
      return;
    }
  }
});

// $ExpectType Element | Element[]
domToReact(htmlToDOM('\t<p>text \r</p>\n'), { trim: true });
