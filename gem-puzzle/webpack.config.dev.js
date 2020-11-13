const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const svgo = require('imagemin-svgo');
const path = require('path');
const pkg = require('./package.json');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './build'),
    open: true,
    disableHostCheck: true,
    hot: true,
    overlay: true,
    watchContentBase: true,
    port: 8080,
  },
  output: {
    filename: 'js/script.js',
    path: path.resolve(__dirname, './build'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/assets/index.html'),
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: {
                    version: 3,
                  },
                  useBuiltIns: 'usage',
                  targets: {
                    browsers: pkg.browserslist.production,
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(s[ca]ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                sourceMap: true,
                plugins: [
                  [
                    'autoprefixer',
                    {
                      overrideBrowserslist: pkg.browserslist.production,
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg)/i,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            },
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                svgo({
                  plugins: [{ convertPathData: false }],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
};
