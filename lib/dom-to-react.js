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

        // node type for script is "script" not "tag"
        if (node.name === 'script' && node.children[0]) {
            // prevent text in script tag from being escaped
            // https://facebook.github.io/react/tips/dangerously-set-inner-html.html
            node.attribs.dangerouslySetInnerHTML = {
                __html: node.children[0].data
            };

        } else if (node.type === 'tag') {
            // setting textarea value in children is an antipattern in React
            // https://facebook.github.io/react/docs/forms.html#why-textarea-value
            if (node.name === 'textarea' && node.children[0]) {
                node.attribs.defaultValue = node.children[0].data;

            } else if (node.children) {
                // continue recursion of creating React elements
                children = domToReact(node.children);
            }
        }

        // specify a `key` prop if returning an array
        // https://fb.me/react-warning-keys
        if (len > 1) {
            node.attribs.key = i;
        }

        result.push(
            React.createElement(
                node.name,
                node.attribs,
                children
            )
        );
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
