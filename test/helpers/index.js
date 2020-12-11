const { renderToStaticMarkup } = require('react-dom/server');

/**
 * Renders a React element to static HTML markup.
 *
 * @param  {ReactElement} reactElement - React element.
 * @return {string}                    - HTML markup.
 */
module.exports.render = reactElement => renderToStaticMarkup(reactElement);
