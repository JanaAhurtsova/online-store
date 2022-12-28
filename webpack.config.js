const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
              test: /\.s?css$/,
              exclude: /node_modules/,
              use: [
                MiniCSSExtractPlugin.loader,
                'css-loader',
                'sass-loader',
              ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
              test: /\.(avif|jpe?g||png|webp)$/i,
              type: 'asset',
            },
            {
              test: /\.(svg)$/i,
              type: 'asset/inline',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: './[name].[contenthash][ext][query]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            favicon: path.resolve(__dirname, './src/assets/favicon.png'),
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
          filename: '[name].[contenthash].css',
        }),
        new ESLintPlugin({ extensions: 'ts' }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
