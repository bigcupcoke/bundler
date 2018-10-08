const {
    log,
    entryFromPath
} = require('./utils');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const entry = entryFromPath('./src/views/**/*.js');
const entryChunks = Object.keys(entry);

const htmlPlugins = entryChunks.map(name => {
    
    return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        chunks: [name, 'commons', 'vendor'],
        title: '',
        // 压缩html
        // minify: {
        //     collapseWhitespace: true,
        // },
    })
})

const config = {
    entry: entry,
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/views/')
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_moudles/'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
                // use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                }),
                // use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    },
    optimization: {
        splitChunks: {
            minSize: 10,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                chunks: 'all',
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendor',
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 1
                },
            }
        },
        runtimeChunk: {
            name: 'runtime'
        },
    },
    plugins: [
        new CleanWebpackPlugin('./dist'),

        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),

        // new BundleAnalyzerPlugin({
        //     openAnalyzer: false,
        // }),
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
    },
}

config.plugins = config.plugins.concat(htmlPlugins);

module.exports = config;