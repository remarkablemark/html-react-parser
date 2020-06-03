// TypeScript Version: 3.3

import { DomElement } from 'domhandler';
import domToReact from './lib/dom-to-react';
import htmlToDOM from 'html-dom-parser';

export interface HTMLReactParserOptions {
  replace?: (
    domNode: DomElement
  ) => JSX.Element | object | void | undefined | null | false;
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
}

/**
 * Converts HTML string to JSX element(s).
 *
 * @param  html    - The HTML string to parse to JSX element(s).
 * @param  options - The parser options.
 * @return         - Single or array of JSX elements.
 */
declare function HTMLReactParser(
  html: string,
  options?: HTMLReactParserOptions
): ReturnType<typeof domToReact>;

export { DomElement, domToReact, htmlToDOM };

export default HTMLReactParser;
