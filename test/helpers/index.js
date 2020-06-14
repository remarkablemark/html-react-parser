const { renderToStaticMarkup } = require('react-dom/server');

module.exports.data = require('./data');

/**
 * Renders a React element to static HTML markup.
 *
 * @param  {ReactElement} reactElement - The React element.
 * @return {String}                    - The static HTML markup.
 */
module.exports.render = reactElement => renderToStaticMarkup(reactElement);
