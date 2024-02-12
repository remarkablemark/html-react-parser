import type { DomHandlerOptions } from 'domhandler';
import type { DOMNode } from 'html-dom-parser';
import type { ParserOptions } from 'htmlparser2';
import type { JSX, ReactNode } from 'react';

export interface HTMLReactParserOptions {
  htmlparser2?: ParserOptions & DomHandlerOptions;

  library?: {
    cloneElement: (
      element: JSX.Element,
      props?: object,
      ...children: any[]
    ) => JSX.Element;
    createElement: (
      type: any,
      props?: object,
      ...children: any[]
    ) => JSX.Element;
    isValidElement: (element: any) => boolean;
    [key: string]: any;
  };

  replace?: (
    domNode: DOMNode,
    index: number,
  ) => JSX.Element | string | null | boolean | object | void;

  transform?: (
    reactNode: ReactNode,
    domNode: DOMNode,
    index: number,
  ) => JSX.Element | string | null | void;

  trim?: boolean;
}
