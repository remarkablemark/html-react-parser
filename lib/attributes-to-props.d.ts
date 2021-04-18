// TypeScript Version: 4.1

export type Attributes = Record<string, string>;

export type Props = Record<string, string> & {
  style: Record<string, string>;
};

/**
 * Converts HTML/SVG DOM attributes to React props.
 *
 * @param  attributes - HTML/SVG DOM attributes.
 * @return            - React props.
 */
export default function attributesToProps(attributes: Attributes): Props;
