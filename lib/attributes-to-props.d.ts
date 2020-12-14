// TypeScript Version: 4.1

export type Attributes = Record<string, string>;
export type Props = Attributes;

/**
 * Converts HTML/SVG DOM attributes to React props.
 *
 * @param  attributes - HTML/SVG DOM attributes.
 * @return            - React props.
 */
export default function attributesToProps(attributes: Attributes): Props;
