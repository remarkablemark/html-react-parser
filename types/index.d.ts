// TypeScript Version: 3.3

import * as React from 'react';

export as namespace HTMLReactParser;

export default HTMLReactParser;

type ReactElement = React.DetailedReactHTMLElement<{}, HTMLElement>;

export interface HTMLReactParserOptions {
  // TODO: Replace `object` by type for objects like `{ type: 'h1', props: { children: 'Heading' } }`
  replace(domNode: DomNode): React.ReactElement | object | undefined | false;
}

/**
 * Convert HTML string to React elements.
 * @returns ReactElement on successful parse or string when `html` cannot be
 * parsed as HTML
 */
declare function HTMLReactParser(
  html: string,
  options?: HTMLReactParserOptions
): ReactElement | ReactElement[] | string;

/** domhandler node */
export interface DomNode {
  type: 'tag' | 'text' | 'directive' | 'comment' | 'script' | 'style';
  name: string;
  data?: string;
  attribs?: {
    [attributeName: string]: string;
  };
  children?: DomNode[];
  parent?: DomNode;
  prev?: DomNode;
  next?: DomNode;
  startIndex?: number;
  endIndex?: number;
}
