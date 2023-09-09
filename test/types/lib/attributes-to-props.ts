import attributesToProps, {
  type Attributes
} from 'html-react-parser/lib/attributes-to-props';

let attributes: Attributes = {};

attributes = {
  class: 'my-class',
  style: 'color: #bada55; line-height: 42;'
};

// $ExpectType Props
attributesToProps(attributes);
