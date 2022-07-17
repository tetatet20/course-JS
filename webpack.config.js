const path = require('path');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWeppackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }

    ]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

if (isDev) {
    console.log('IS DEV', isDev)
}
else {
    console.log('IS PROD', isProd)
}


const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')

        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev
    },
    plugins: [
        new HtmlWebpackPugPlugin(),
        new CleanWebpackPlugin(),
        new HTMLWeppackPlugin({
            template: 'index.pug',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, './src/favicon.ico'),
                to: path.resolve(__dirname, 'dist/favicon.ico')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
    ],
    module: {
        rules: [{
          test: /\.pug$/,
          use: [{
                  loader: 'html-loader'
              },
              {
                  loader: 'pug-html-loader',
                  options: {
                      exports: false
                  }
              }
          ]
      },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                    jsLoaders(),

                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env',
                            '@babel/preset-typescript',
                        ]
                    }
                }
            },
        ],
    }
}

//02/07 урок