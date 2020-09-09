// TypeScript Version: 3.3

/**
 * Converts HTML/SVG DOM attributes to React props.
 *
 * @param attributes        - The HTML/SVG DOM attributes.
 * @returns                 - The React props.
 */
export default function attributesToProps(
  attributes: { [key: string]: string }
): { [key: string]: string };
