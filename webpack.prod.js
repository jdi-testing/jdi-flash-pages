const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: true,
        //     compress: {
        //         warnings: false, // Suppress uglification warnings
        //         pure_getters: true,
        //         unsafe: true,
        //         unsafe_comps: true,
        //         screw_ie8: true
        //     },
        //     output: {
        //         comments: false,
        //     },
        //     exclude: [/\.min\.js$/gi] // skip pre-minified libs
        // }),
        // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/])
    ]
});
