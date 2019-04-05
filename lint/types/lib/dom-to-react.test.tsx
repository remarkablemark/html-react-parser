import { HTMLReactParserOptions } from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import * as React from 'react';
import htmlToDOM from 'html-dom-parser';

/* $ExpectType ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) |
(new (props: any) => Component<any, any, any>)> |
ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) |
(new (props: any) => Component<any, any, any>)>[] */
domToReact(htmlToDOM('<div>text</div>'));

// `options.replace`

// Return React.createElement from `replace`
domToReact(htmlToDOM('<p id="replace">text</p>'), {
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

domToReact(htmlToDOM('<p><br id="remove"></p>'), options);

// Return domhandler node
domToReact(htmlToDOM('<a id="header" href="#">Heading</a>'), {
  replace: node => {
    if (node.attribs && node.attribs.id === 'header') {
      return {
        type: 'h1',
        props: { children: 'Heading' }
      };
    }
  }
});
