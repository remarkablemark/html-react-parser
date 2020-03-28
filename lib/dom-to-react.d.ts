// TypeScript Version: 3.3

import { HTMLReactParserOptions } from '..';
import { DomElement } from 'domhandler';

/**
 * Converts DOM nodes to JSX element(s).
 *
 * @param nodes - An array of DomNodes to convert to JSX element(s).
 * @param options - Options to use when converting to JSX.
 * @returns Single or array of JSX elements.
 */
export default function domToReact(
  nodes: DomElement[],
  options?: HTMLReactParserOptions
): JSX.Element | JSX.Element[];
