import type { DOMNode, Element, Text } from 'html-dom-parser';
import type { JSX } from 'react';
import { cloneElement, createElement, isValidElement } from 'react';

import type { Props } from './attributes-to-props';
import attributesToProps from './attributes-to-props';
import type { HTMLReactParserOptions } from './types';
import {
  canTextBeChildOfNode,
  isCustomComponent,
  PRESERVE_CUSTOM_ATTRIBUTES,
  returnFirstArg,
  setStyleProp,
} from './utilities';

const React = {
  cloneElement,
  createElement,
  isValidElement,
} as const;

/**
 * Converts DOM nodes to JSX element(s).
 *
 * @param nodes - DOM nodes.
 * @param options - Options.
 * @returns - String or JSX element(s).
 */
export default function domToReact(
  nodes: DOMNode[],
  options: HTMLReactParserOptions = {},
): string | JSX.Element | JSX.Element[] {
  const reactElements = [];

  const hasReplace = typeof options.replace === 'function';
  const transform = options.transform || returnFirstArg;
  const { cloneElement, createElement, isValidElement } =
    options.library || React;

  const nodesLength = nodes.length;

  for (let index = 0; index < nodesLength; index++) {
    const node = nodes[index];

    // replace with custom React element (if present)
    if (hasReplace) {
      let replaceElement = options.replace!(node, index) as JSX.Element;

      if (isValidElement(replaceElement)) {
        // set "key" prop for sibling elements
        // https://react.dev/learn/rendering-lists#rules-of-keys
        if (nodesLength > 1) {
          replaceElement = cloneElement(replaceElement, {
            key: replaceElement.key || index,
          });
        }

        reactElements.push(transform(replaceElement, node, index));
        continue;
      }
    }

    if (node.type === 'text') {
      const isWhitespace = !node.data.trim().length;

      // We have a whitespace node that can't be nested in its parent
      // so skip it
      if (
        isWhitespace &&
        node.parent &&
        !canTextBeChildOfNode(node.parent as Element)
      ) {
        continue;
      }

      // Trim is enabled and we have a whitespace node
      // so skip it
      if (options.trim && isWhitespace) {
        continue;
      }

      // We have a text node that's not whitespace and it can be nested
      // in its parent so add it to the results
      reactElements.push(transform(node.data, node, index));
      continue;
    }

    const element = node as Element;
    let props: Props = {};

    if (skipAttributesToProps(element)) {
      setStyleProp(element.attribs.style, element.attribs);
      props = element.attribs;
    } else if (element.attribs) {
      props = attributesToProps(element.attribs, element.name);
    }

    let children: ReturnType<typeof domToReact> | undefined;

    switch (node.type) {
      case 'script':
      case 'style':
        // prevent text in <script> or <style> from being escaped
        // https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html
        if (node.children[0]) {
          props.dangerouslySetInnerHTML = {
            __html: (node.children[0] as Text).data,
          };
        }
        break;

      case 'tag':
        // setting textarea value in children is an antipattern in React
        // https://react.dev/reference/react-dom/components/textarea#caveats
        if (node.name === 'textarea' && node.children[0]) {
          props.defaultValue = (node.children[0] as Text).data;
        } else if (node.children && node.children.length) {
          // continue recursion of creating React elements (if applicable)
          children = domToReact(node.children as Text[], options);
        }
        break;

      // skip all other cases (e.g., comment)
      default:
        continue;
    }

    // set "key" prop for sibling elements
    // https://react.dev/learn/rendering-lists#rules-of-keys
    if (nodesLength > 1) {
      props.key = index;
    }

    reactElements.push(
      transform(createElement(node.name, props, children), node, index),
    );
  }

  return reactElements.length === 1 ? reactElements[0] : reactElements;
}

/**
 * Determines whether DOM element attributes should be transformed to props.
 * Web Components should not have their attributes transformed except for `style`.
 *
 * @param node - Element node.
 * @returns - Whether the node attributes should be converted to props.
 */
function skipAttributesToProps(node: Element): boolean {
  return (
    PRESERVE_CUSTOM_ATTRIBUTES &&
    node.type === 'tag' &&
    isCustomComponent(node.name, node.attribs)
  );
}
