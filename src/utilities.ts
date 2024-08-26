import type { Element } from 'html-dom-parser';
import { version } from 'react';
import StyleToJS from 'style-to-js';

import type { Props } from './attributes-to-props';

const RESERVED_SVG_MATHML_ELEMENTS = new Set([
  'annotation-xml',
  'color-profile',
  'font-face',
  'font-face-src',
  'font-face-uri',
  'font-face-format',
  'font-face-name',
  'missing-glyph',
] as const);

type ReservedSvgMathmlElements =
  typeof RESERVED_SVG_MATHML_ELEMENTS extends Set<infer T> ? T : never;

/**
 * Check if a tag is a custom component.
 *
 * @see {@link https://github.com/facebook/react/blob/v16.6.3/packages/react-dom/src/shared/isCustomComponent.js}
 *
 * @param tagName - Tag name.
 * @param props - Props passed to the element.
 * @returns - Whether the tag is custom component.
 */
export function isCustomComponent(
  tagName: string,
  props?: Record<PropertyKey, string>,
): boolean {
  if (!tagName.includes('-')) {
    return Boolean(props && typeof props.is === 'string');
  }

  // These are reserved SVG and MathML elements.
  // We don't mind this whitelist too much because we expect it to never grow.
  // The alternative is to track the namespace in a few places which is convoluted.
  // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
  if (RESERVED_SVG_MATHML_ELEMENTS.has(tagName as ReservedSvgMathmlElements)) {
    return false;
  }

  return true;
}

const styleOptions = {
  reactCompat: true,
} as const;

/**
 * Sets style prop.
 *
 * @param style - Inline style.
 * @param props - Props object.
 */
export function setStyleProp(style: string, props: Props): void {
  if (typeof style !== 'string') {
    return;
  }

  if (!style.trim()) {
    props.style = {};
    return;
  }

  try {
    props.style = StyleToJS(style, styleOptions);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    props.style = {};
  }
}

/**
 * @see https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html
 */
export const PRESERVE_CUSTOM_ATTRIBUTES = Number(version.split('.')[0]) >= 16;

/**
 * @see https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react-dom/src/client/validateDOMNesting.js#L213
 */
export const ELEMENTS_WITH_NO_TEXT_CHILDREN = new Set([
  'tr',
  'tbody',
  'thead',
  'tfoot',
  'colgroup',
  'table',
  'head',
  'html',
  'frameset',
] as const);

type ElementsWithNoTextChildren =
  typeof ELEMENTS_WITH_NO_TEXT_CHILDREN extends Set<infer T> ? T : never;

/**
 * Checks if the given node can contain text nodes
 *
 * @param node - Element node.
 * @returns - Whether the node can contain text nodes.
 */
export const canTextBeChildOfNode = (node: Element) =>
  !ELEMENTS_WITH_NO_TEXT_CHILDREN.has(node.name as ElementsWithNoTextChildren);

/**
 * Returns the first argument as is.
 *
 * @param arg - The argument to be returned.
 * @returns - The input argument `arg`.
 */
export const returnFirstArg = (arg: any) => arg;
