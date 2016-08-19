'use strict';

/**
 * Module dependencies.
 */
var React = require('react');
var attributesToProps = require('./attributes-to-props');

/**
 * Convert DOM nodes to React elements.
 *
 * @param  {Array} nodes - The DOM nodes.
 * @return {ReactElement|Array}
 */
function domToReact(nodes) {
    var result = [];
    var node;
    var props;
    var children;

    for (var i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];

        if (node.type === 'text') {
            result.push(node.data);
            continue;
        }

        // update values
        props = attributesToProps(node.attribs);
        children = null;

        // node type for script is "script" not "tag"
        if (node.name === 'script' && node.children[0]) {
            // prevent text in script tag from being escaped
            // https://facebook.github.io/react/tips/dangerously-set-inner-html.html
            props.dangerouslySetInnerHTML = {
                __html: node.children[0].data
            };

        } else if (node.type === 'tag') {
            // setting textarea value in children is an antipattern in React
            // https://facebook.github.io/react/docs/forms.html#why-textarea-value
            if (node.name === 'textarea' && node.children[0]) {
                props.defaultValue = node.children[0].data;

            } else if (node.children) {
                // continue recursion of creating React elements
                children = domToReact(node.children, options);
            }

        // skip all other cases (e.g., comment)
        } else {
            continue;
        }

        // specify a `key` prop if returning an array
        // https://fb.me/react-warning-keys
        if (len > 1) {
            props.key = i;
        }

        result.push(
            React.createElement(node.name, props, children)
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
