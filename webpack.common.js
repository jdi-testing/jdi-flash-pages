const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: ["babel-polyfill", "./app/index.js"],
    //entry: './app/index.js',
    devServer: {
       contentBase: './dist',
       hot: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js",
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    fix: true,
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // Could also be write as follow:
                    // use: 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        'postcss-loader'
                    ]
                }),
            },
            // {
            //     test: /\.scss$/,
            //     exclude: /node_modules/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         // Could also be write as follow:
            //         // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
            //         use: [
            //             {
            //                 loader: 'css-loader',
            //                 query: {
            //                     modules: true,
            //                     sourceMap: true,
            //                     importLoaders: 2,
            //                     localIdentName: '[name]__[local]___[hash:base64:5]'
            //                 }
            //             },
            //             'sass-loader'
            //         ]
            //     }),
            // },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'html/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            'ReactDOM': 'react-dom',
            'React': 'react',
            'PropTypes': 'prop-types'
        }),
      //  new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({ filename: 'app/style/style.css', disable: false, allChunks: true })
    ]
};
