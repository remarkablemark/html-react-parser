// TypeScript Version: 3.3

import { HTMLReactParserOptions } from '..';
import { DomElement } from 'domhandler';

/**
 * Converts DOM nodes to JSX element(s).
 *
 * @param nodes   - DOM nodes.
 * @param options - Parser options.
 * @returns       - JSX element(s).
 */
export default function domToReact(
  nodes: DomElement[],
  options?: HTMLReactParserOptions
): JSX.Element | JSX.Element[];
