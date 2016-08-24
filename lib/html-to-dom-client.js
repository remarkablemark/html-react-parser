'use strict';

/**
 * Format the browser DOM attributes.
 *
 * @param  {NamedNodeMap} - The attributes.
 * @return {Object}
 */
function formatAttributes(attributes) {
    var result = {};
    var attribute;

    // NamedNodeMap is array-like
    for (var i = 0, len = attributes.length; i < len; i++) {
        attribute = attributes[i];
        result[attribute.name] = attribute.value;
    }

    return result;
}

/**
 * Format the browser DOM nodes to match that of `htmlparser2.parseDOM`.
 *
 * @param  {NodeList} nodes        - The DOM nodes.
 * @param  {Object}   [parentNode] - The parent node that's already formatted.
 * @return {Object}
 */
function formatDOM(nodes, parentNode) {
    var result = [];
    var node;
    var prevNode;
    var nodeObj;

    // NodeList is array-like
    for (var i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];
        // reset
        nodeObj = {
            next: null,
            prev: result[i - 1] || null,
            parent: parentNode || null
        };

        // set the next node for the previous node (if applicable)
        prevNode = result[i - 1];
        if (prevNode) {
            prevNode.next = nodeObj;
        }

        // set the node name if it's not "#text" or "#comment"
        // e.g., "div"
        if (node.nodeName.indexOf('#') !== 0) {
            nodeObj.name = node.nodeName.toLowerCase();

            // also, type "tag" nodes have"attribs"
            nodeObj.attribs = {}; // default
            if (node.attributes && node.attributes.length) {
                nodeObj.attribs = formatAttributes(node.attributes);
            }
        }

        // set the node type
        // e.g., "tag"
        switch (node.nodeType) {
            // 1 = element
            case 1:
                if (nodeObj.name === 'script' || nodeObj.name === 'style') {
                    nodeObj.type = nodeObj.name;
                } else {
                    nodeObj.type = 'tag';
                }
                // recursively format the children
                nodeObj.children = formatDOM(node.childNodes, nodeObj);
                break;
                // 2 = attribute
                // 3 = text
            case 3:
                nodeObj.type = 'text';
                nodeObj.data = node.nodeValue;
                break;
                // 8 = comment
            case 8:
                nodeObj.type = 'comment';
                nodeObj.data = node.nodeValue;
                break;
            default:
                break;
        }

        result.push(nodeObj);
    }

    return result;
}

/**
 * Parse HTML string to DOM nodes.
 * This uses the browser DOM API.
 *
 * @param  {String} html - The HTML.
 * @return {Object}      - The DOM nodes.
 */
function htmlToDOMClient(html) {
    var match = typeof html === 'string' ? html.match(/<(.+?)>/) : null;
    var tagName;
    var parentNode;
    var nodes;

    if (match && typeof match[1] === 'string') {
        tagName = match[1].toLowerCase();
    }

    // `DOMParser` can parse full HTML
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
    if (tagName && window.DOMParser) {
        var parser = new window.DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // <head> and <body> are siblings
        if (tagName === 'head' || tagName === 'body') {
            nodes = doc.getElementsByTagName(tagName);

        // document's child nodes
        } else if (tagName === 'html') {
            nodes = doc.childNodes;

        // get the element's parent's child nodes
        // do this in case of adjacent elements
        } else {
            parentNode = doc.getElementsByTagName(tagName)[0].parentNode;
            nodes = parentNode.childNodes;
        }

    // otherwise, use `innerHTML`
    // but this will strip out tags like <html> and <body>
    } else {
        parentNode = document.createElement('div');
        parentNode.innerHTML = html;
        nodes = parentNode.childNodes;
    }

    return formatDOM(nodes);
}

/**
 * Export HTML to DOM parser (client).
 */
module.exports = htmlToDOMClient;
