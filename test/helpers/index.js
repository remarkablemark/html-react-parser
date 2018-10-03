const { isValidElement } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const data = require('./mocks');

/**
 * Renders a React element to static HTML markup.
 *
 * @param  {ReactElement} reactElement - The React element.
 * @return {String}                    - The static HTML markup.
 */
const render = reactElement => {
  if (!isValidElement(reactElement)) {
    throw new Error(reactElement, 'is not a valid React element.');
  }
  return renderToStaticMarkup(reactElement);
};

module.exports = {
  render,
  data
};
