import parse from 'html-react-parser';
import * as React from 'react';

// $ExpectType string | Element | Element[]
parse('<hr>', {
  library: {
    cloneElement: (element, props, children) =>
      React.cloneElement(element, props, children),
    createElement: (type, props, children) =>
      React.createElement(type, props, children),
    isValidElement: element => React.isValidElement(element)
  }
});
