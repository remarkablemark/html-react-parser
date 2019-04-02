// TypeScript Version: 3.3

import * as React from 'react';
import { HTMLReactParserOptions } from '..';
import { DomElement } from 'domhandler';

/**
 * Converts DOM nodes to React elements.
 *
 * @param nodes - A list of formatted DomNodes to convert to React.
 * @param options - Options to use when converting to react.
 * @returns ReactElement or and array of ReactElements.
 */
export default function domToReact(
  nodes: DomElement[],
  options?: HTMLReactParserOptions
): React.ReactElement | React.ReactElement[];
