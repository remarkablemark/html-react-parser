'use strict';

/**
 * Export webpack configuration.
 */
module.exports = {
    entry: './index',
    output: {
        filename: './dist/html-to-react.min.js',
        library: 'HTMLReactParser',
        libraryTarget: 'umd'
    },
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    }
};
