'use strict';

/**
 * Module dependencies.
 */
var React = require('react');

/**
 * Convert DOM nodes to React elements.
 *
 * @param  {Array} nodes - The DOM nodes.
 * @return {ReactElement|Array}
 */
function domToReact(nodes) {
    var result = [];
    var node;
    var children;

    for (var i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];

        if (node.type === 'text') {
            result.push(node.data);
            continue;
        }

        children = null;

        if (node.type === 'tag') {
            if (node.children) {
                // continue recursion of creating React elements
                children = domToReact(node.children);
            }

            result.push(
                React.createElement(
                    node.name,
                    node.attribs,
                    children
                )
            );
        }
    }

    if (result.length === 1) {
        return result[0];
    } else {
        return result;
    }
}

/**
 * Export DOM to React parser.
 */
module.exports = domToReact;
