import htmlToDOM from 'html-dom-parser';

import attributesToProps from './attributes-to-props';
import domToReact from './dom-to-react';
import type { HTMLReactParserOptions } from './types';

export { Comment, Element, ProcessingInstruction, Text } from 'domhandler';
export type { DOMNode } from 'html-dom-parser';

export type { HTMLReactParserOptions };
export { attributesToProps, domToReact, htmlToDOM };

const domParserOptions = { lowerCaseAttributeNames: false } as const;

/**
 * Converts HTML string to React elements.
 *
 * @param html - HTML string.
 * @param options - Parser options.
 * @returns - React element(s), empty array, or string.
 */
export default function HTMLReactParser(
  html: string,
  options?: HTMLReactParserOptions,
): ReturnType<typeof domToReact> {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (!html) {
    return [];
  }

  return domToReact(
    htmlToDOM(html, options?.htmlparser2 || domParserOptions),
    options,
  );
}
