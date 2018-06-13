const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            'ReactDOM': 'react-dom',
            'React': 'react',
            'PropTypes': 'prop-types'
        }),

        //new BundleAnalyzerPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"'
        // })
    ]
});
