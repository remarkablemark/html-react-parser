// TypeScript Version: 3.3

import * as React from 'react';

export as namespace HTMLReactParser;

export default HTMLReactParser;

type ReactElement = React.DetailedReactHTMLElement<{}, HTMLElement>;

export interface HTMLReactParserOptions {
  // TODO: Specify return type. React.ReactElement | undefined | false is not enough
  replace(domNode: DomNode): any;
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
