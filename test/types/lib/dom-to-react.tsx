import { Element } from 'domhandler';
import { HTMLReactParserOptions } from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import * as React from 'react';
import htmlToDOM from 'html-dom-parser';

// $ExpectType (Element | Text | Comment | ProcessingInstruction)[]
htmlToDOM('<div>text</div>');

// $ExpectType string | Element | Element[]
domToReact(htmlToDOM('string'));

// $ExpectType string | Element | Element[]
domToReact(htmlToDOM('<div>text</div>'));

// $ExpectType string | Element | Element[]
domToReact(htmlToDOM('<p id="replace">text</p>'), {
  replace: domNode => {
    if (domNode instanceof Element && domNode.attribs.id === 'replace') {
      return <span>replaced</span>;
    }
  }
});

const options: HTMLReactParserOptions = {
  replace: domNode => {
    if (domNode instanceof Element && domNode.attribs.id === 'remove') {
      return <></>;
    }
  }
};

// $ExpectType string | Element | Element[]
domToReact(htmlToDOM('<p><br id="remove"></p>'), options);

// $ExpectType string | Element | Element[]
domToReact(htmlToDOM('<a id="header" href="#">Heading</a>'), {
  replace: domNode => {
    if (domNode instanceof Element && domNode.attribs.id === 'header') {
      return;
    }
  }
});

// $ExpectType string | Element | Element[]
domToReact(htmlToDOM('\t<p>text \r</p>\n'), { trim: true });
