// TypeScript Version: 4.1

import { DOMNode, HTMLReactParserOptions } from '..';

export { DOMNode, HTMLReactParserOptions };

/**
 * Converts DOM nodes to JSX element(s).
 *
 * @param  nodes   - DOM nodes.
 * @param  options - Parser options.
 * @return         - JSX element(s).
 */
export default function domToReact(
  nodes: DOMNode[],
  options?: HTMLReactParserOptions
): string | JSX.Element | JSX.Element[];
