import * as React from 'react';
import { DomNode, HTMLReactParserOptions } from 'html-react-parser';

/**
 * Converts DOM nodes to React elements.
 * @returns ReactElement or and array of ReactElements.
 */
export default function domToReact(
  nodes: DomNode[],
  options?: HTMLReactParserOptions
): React.ReactElement | React.ReactElement[];
