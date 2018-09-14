const path = require('path')

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_moudles/'
            },
            {
                test: '/.tsx$/',
                loader: 'ts-loader',
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    },
}