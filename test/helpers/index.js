'use strict';

/**
 * Module dependencies.
 */
var React = require('react');
var ReactDOMServer = require('react-dom/server');

/**
 * Render a React element to static HTML markup.
 *
 * @param  {ReactElement} reactElement - The React element.
 * @return {String}                    - The static HTML markup.
 */
function render(reactElement) {
  if (!React.isValidElement(reactElement)) {
    throw new Error(reactElement, 'is not a valid React element.');
  }
  return ReactDOMServer.renderToStaticMarkup(reactElement);
}

/**
 * Export assert helpers.
 */
module.exports = {
  render: render,
  mocks: require('./mocks')
};
