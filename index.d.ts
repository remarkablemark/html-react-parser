// TypeScript Version: 4.7

import { ParserOptions } from 'htmlparser2';
import {
  Comment,
  DomHandlerOptions,
  Element,
  Node,
  ProcessingInstruction,
  Text
} from 'domhandler';
import htmlToDOM from 'html-dom-parser';

import attributesToProps from './lib/attributes-to-props';
import domToReact from './lib/dom-to-react';

export { attributesToProps, domToReact, htmlToDOM };
export type HTMLParser2Options = ParserOptions & DomHandlerOptions;
export { Comment, Element, Node, ProcessingInstruction, Text };
export type DOMNode = Comment | Element | Node | ProcessingInstruction | Text;

export interface HTMLReactParserOptions {
  htmlparser2?: HTMLParser2Options;

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
    domNode: DOMNode
  ) => JSX.Element | object | void | undefined | null | false;

  trim?: boolean;
}

/**
 * Converts HTML string to JSX element(s).
 *
 * @param html - HTML string.
 * @param options - Parser options.
 * @returns - JSX element(s), empty array, or string.
 */
export default function HTMLReactParser(
  html: string,
  options?: HTMLReactParserOptions
): ReturnType<typeof domToReact>;
