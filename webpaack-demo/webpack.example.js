const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        home: './src/js/page-types/home.js',
        product: './src/js/page-types/product.js',
        cart: './src/js/page-types/cart.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                'vendor-bootstrap': {
                    name: 'vendor-bootstrap',
                    test: /[\\/]node_modules[\\/](jquery|bootstrap)[\\/]/,
                    chunks: 'initial',
                    priority: 2
                },
                'vendor-react': {
                    name: 'vendor-react',
                    test: /[\\/]node_modules[\\/]react.*?[\\/]/,
                    chunks: 'initial',
                    priority: 2
                },
                'vendor-all': {
                    name: 'vendor-all',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    priority: 1
                },
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new Visualizer(),
        new HtmlWebpackPlugin({
            filename: 'home.html',
            chunks: ['vendor-bootstrap', 'vendor-all', 'home']
        }),
        new HtmlWebpackPlugin({
            filename: 'product.html',
            chunks: ['vendor-bootstrap', 'vendor-react', 'vendor-all', 'product']
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            chunks: ['vendor-bootstrap', 'vendor-react', 'vendor-all', 'cart']
        }),
    ]