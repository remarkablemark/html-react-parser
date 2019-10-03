// TypeScript Version: 3.3

import * as React from 'react';
import { DomElement } from 'domhandler';
import domToReact from './lib/dom-to-react';
import htmlToDOM from 'html-dom-parser';

export interface HTMLReactParserOptions {
  // TODO: Replace `object` by type for objects like `{ type: 'h1', props: { children: 'Heading' } }`
  replace(domNode: DomElement): React.ReactElement | object | undefined | false;
}

/**
 * Converts HTML string to React elements.
 *
 * @param  html    - The HTML string to parse to React.
 * @param  options - The parser options.
 * @return         - When parsed with HTML string, returns React elements; otherwise, returns string or empty array.
 */
declare function HTMLReactParser(
  html: string,
  options?: HTMLReactParserOptions
):
  | string
  | React.DetailedReactHTMLElement<{}, HTMLElement>
  | Array<React.DetailedReactHTMLElement<{}, HTMLElement>>;

export { DomElement, domToReact, htmlToDOM };

export default HTMLReactParser;
