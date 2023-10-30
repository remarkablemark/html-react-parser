import {
  BOOLEAN,
  OVERLOADED_BOOLEAN,
  getPropertyInfo,
  isCustomAttribute,
  possibleStandardNames,
} from 'react-property';
import { PRESERVE_CUSTOM_ATTRIBUTES, setStyleProp } from './utilities';

// https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components
// https://developer.mozilla.org/docs/Web/HTML/Attributes
const UNCONTROLLED_COMPONENT_ATTRIBUTES = ['checked', 'value'] as const;
const UNCONTROLLED_COMPONENT_NAMES = ['input', 'select', 'textarea'] as const;

type UncontrolledComponentAttributes =
  (typeof UNCONTROLLED_COMPONENT_ATTRIBUTES)[number];

type UncontrolledComponentNames = (typeof UNCONTROLLED_COMPONENT_NAMES)[number];

const valueOnlyInputs = {
  reset: true,
  submit: true,
} as const;

export type Attributes = Record<string, string>;

export type Props = Record<string, string | boolean> & {
  dangerouslySetInnerHTML?: {
    __html: string;
  };
  key?: string | number;
  style?: Record<string, string>;
};

/**
 * Converts HTML/SVG DOM attributes to React props.
 *
 * @param attributes - HTML/SVG DOM attributes.
 * @param nodeName - DOM node name.
 * @returns - React props.
 */
export default function attributesToProps(
  attributes: Attributes = {},
  nodeName?: string,
): Props {
  const props: Props = {};

  const isInputValueOnly = Boolean(
    attributes.type &&
      valueOnlyInputs[attributes.type as keyof typeof valueOnlyInputs],
  );

  for (const attributeName in attributes) {
    const attributeValue = attributes[attributeName];

    // ARIA (aria-*) or custom data (data-*) attribute
    if (isCustomAttribute(attributeName)) {
      props[attributeName] = attributeValue;
      continue;
    }

    // convert HTML/SVG attribute to React prop
    const attributeNameLowerCased = attributeName.toLowerCase();
    let propName = getPropName(attributeNameLowerCased);

    if (propName) {
      const propertyInfo = getPropertyInfo(propName);

      // convert attribute to uncontrolled component prop (e.g., `value` to `defaultValue`)
      if (
        UNCONTROLLED_COMPONENT_ATTRIBUTES.indexOf(
          propName as UncontrolledComponentAttributes,
        ) !== -1 &&
        UNCONTROLLED_COMPONENT_NAMES.indexOf(
          nodeName! as UncontrolledComponentNames,
        ) !== -1 &&
        !isInputValueOnly
      ) {
        propName = getPropName('default' + attributeNameLowerCased);
      }

      props[propName] = attributeValue;

      switch (propertyInfo && propertyInfo.type) {
        case BOOLEAN:
          props[propName] = true;
          break;
        case OVERLOADED_BOOLEAN:
          if (attributeValue === '') {
            props[propName] = true;
          }
          break;
      }
      continue;
    }

    // preserve custom attribute if React >=16
    if (PRESERVE_CUSTOM_ATTRIBUTES) {
      props[attributeName] = attributeValue;
    }
  }

  // transform inline style to object
  setStyleProp(attributes.style, props);

  return props;
}

/**
 * Gets prop name from lowercased attribute name.
 *
 * @param attributeName - Lowercased attribute name.
 * @returns - Prop name.
 */
function getPropName(attributeName: string): string {
  return possibleStandardNames[attributeName];
}
