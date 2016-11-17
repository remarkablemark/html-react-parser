'use strict';

/**
 * Module dependencies.
 */
var HTMLDOMPropertyConfig;
var SVGDOMPropertyConfig;

// HTML and SVG DOM Property Config
// moved to `react-dom` in v15.4.x
try {
    HTMLDOMPropertyConfig = require('react-dom/lib/HTMLDOMPropertyConfig');
    SVGDOMPropertyConfig = require('react-dom/lib/SVGDOMPropertyConfig');
} catch (error) {
    HTMLDOMPropertyConfig = require('react/lib/HTMLDOMPropertyConfig');
    SVGDOMPropertyConfig = require('react/lib/SVGDOMPropertyConfig');
}

/**
 * Export config.
 */
module.exports = {
    HTMLDOMPropertyConfig: HTMLDOMPropertyConfig,
    SVGDOMPropertyConfig: SVGDOMPropertyConfig
};
