// TypeScript Version: 3.3

import * as React from 'react';
import { DomElement } from 'domhandler';

export { DomElement };

export as namespace HTMLReactParser;

export default HTMLReactParser;

type ReactElement = React.DetailedReactHTMLElement<{}, HTMLElement>;

export interface HTMLReactParserOptions {
  // TODO: Replace `object` by type for objects like `{ type: 'h1', props: { children: 'Heading' } }`
  replace(domNode: DomElement): React.ReactElement | object | undefined | false;
}

/**
 * Convert HTML string to React elements.
 *
 * @param - Raw string of HTML to parse.
 * @param options - Options to use when converting to react.
 * @returns ReactElement on successful parse or string when `html` cannot be
 * parsed as HTML
 */
declare function HTMLReactParser(
  html: string,
  options?: HTMLReactParserOptions
): ReactElement | ReactElement[] | string;
