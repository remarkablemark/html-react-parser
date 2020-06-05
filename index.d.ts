// TypeScript Version: 3.3

import { DomElement, ParserOptions } from 'htmlparser2';
import domToReact from './lib/dom-to-react';
import htmlToDOM from 'html-dom-parser';

export interface HTMLReactParserOptions {
  htmlparser2?: ParserOptions;

  library?: {
    cloneElement: (
      element: JSX.Element,
      props?: object,
      ...children: any
    ) => JSX.Element;
    createElement: (type: any, props?: object, ...children: any) => JSX.Element;
    isValidElement: (element: any) => boolean;
    [key: string]: any;
  };

  replace?: (
    domNode: DomElement
  ) => JSX.Element | object | void | undefined | null | false;

  trim?: boolean;
}

/**
 * Converts HTML string to JSX element(s).
 *
 * @param  html    - HTML string.
 * @param  options - Parser options.
 * @return         - JSX element(s), empty array, or string.
 */
declare function HTMLReactParser(
  html: string,
  options?: HTMLReactParserOptions
): ReturnType<typeof domToReact>;

export { DomElement, ParserOptions, domToReact, htmlToDOM };

export default HTMLReactParser;
