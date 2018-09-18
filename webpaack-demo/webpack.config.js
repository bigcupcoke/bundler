const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // entry: './src/index.js',
    entry: {
        'a': ['./src/views/pageA/a.js', './src/views/pageB/b.js'],
        'acss': './src/views/pageA/a.css',
    // entry: {
    //     a: './src/common-chunck/a.js',
    //     b: './src/common-chunck/b.js',
    //     vendor: ['loadsh'],
    },
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
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
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name]-[id].css',
            allChunks: true
        }),
        
        new BundleAnalyzerPlugin()
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'mainfest'],
        //     minChunks: Infinity,
        // }),
    ],
    devServer: {

    },
}