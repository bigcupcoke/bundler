const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    entry: {
        'a': './src/views/pageA/a.js',
        'acss': './src/views/pageA/a.css',
    // entry: {
    //     a: './src/common-chunck/a.js',
    //     b: './src/common-chunck/b.js',
    //     vendor: ['loadsh'],
    },
    devtool: 'inline-source-map',
    // mode: 'development',
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
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'a.css',
            minChunks: 2,
            chunks: ['a', 'b']

        }),

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'mainfest'],
            minChunks: Infinity,
        }),
    ],
}