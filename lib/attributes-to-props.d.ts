// TypeScript Version: 4.7

export type Attributes = Record<string, string>;

export type Props = Record<string, string> & {
  style: Record<string, string>;
};

/**
 * Converts HTML/SVG DOM attributes to React props.
 *
 * @param attributes - HTML/SVG DOM attributes.
 * @returns - React props.
 */
export default function attributesToProps(attributes: Attributes): Props;
