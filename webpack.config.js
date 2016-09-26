'use strict';

/**
 * Export webpack configuration.
 */
module.exports = {
    output: {
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
