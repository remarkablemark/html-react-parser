const { renderToStaticMarkup } = require('react-dom/server');

/**
 * Renders a React element to static HTML markup.
 *
 * @param {ReactElement} reactElement - React element.
 * @returns {string} - HTML markup.
 */
exports.render = reactElement => renderToStaticMarkup(reactElement);
