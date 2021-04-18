import attributesToProps, {
  Attributes,
  Props
} from 'html-react-parser/lib/attributes-to-props';

let attributes: Attributes = {};

attributes = {
  class: 'my-class',
  style: 'color: #bada55; line-height: 42;'
};

// $ExpectType Props
const {
  className,
  style: { color, lineHeight }
} = attributesToProps(attributes);
