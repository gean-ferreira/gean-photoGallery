const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('./node_modules/webpack')
const MiniCssExtractPlugin = require('./node_modules/mini-css-extract-plugin')
const UglifyJsPlugin = require('./node_modules/uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('./node_modules/optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('./node_modules/copy-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        contentBase: './build',
        port: 8081,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/build'
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'style.css' }),
        new CopyWebpackPlugin([
            { context: 'src/', from: '**/*.html' },
            { context: 'src/', from: 'imgs/**/*' }
        ])
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                // 'style-loader', // Adiciona CSS a DOM injetando a tag <style>
                'css-loader', // interpreta @import, url()...
                'sass-loader',
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }, {
            test: /.(ttf|otf|eot|svg|woff(2)?)$/,
            use: ['file-loader']
        }]
    }
}