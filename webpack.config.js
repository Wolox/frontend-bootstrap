'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DotEnv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
    vendor: ['angular']
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '/js')
  },
  target: 'web',
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    hot: true
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            cache: true,
            emitError: true,
            emitWarning: true
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie <9'
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'src/scss')]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie <9'
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|otf)$/,
        use: 'file-loader?name=assets/[name].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new DotEnv(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    }),
    new HtmlWebpackPlugin({
      title: 'Front-End Bootstrap',
      template: './src/views/index/index.pug',
      filename: 'index.html'
    })
  ],
  devtool: 'eval',
  optimization: {
    splitChunks: {
      chunks: 'async'
    }
  },
  performance: {
    hints: false
  }
};
