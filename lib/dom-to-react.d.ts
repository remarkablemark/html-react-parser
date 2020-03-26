// TypeScript Version: 3.3

import { HTMLReactParserOptions } from '..';
import { DomElement } from 'domhandler';

/**
 * Converts DOM nodes to React elements.
 *
 * @param nodes - A list of formatted DomNodes to convert to JSX.
 * @param options - Options to use when converting to JSX.
 * @returns JSX.Element or an array of JSX.Elements.
 */
export default function domToReact(
  nodes: DomElement[],
  options?: HTMLReactParserOptions
): JSX.Element | JSX.Element[];
