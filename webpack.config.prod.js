'use strict'

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const glob = require('glob')

const entry = glob
  .sync('./src/**/*.js')
  .reduce(
    (entries, entry) =>
      Object.assign(entries, { [path.parse(entry).name]: entry })
    , { index: './src/index.js' }
  )

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  target: 'web',
  resolve: {
    extensions: ['.js'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src/views'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          'extract-loader',
          'html-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /index.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          'extract-loader',
          'html-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: ['node_modules'],
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
                includePaths: [path.resolve(__dirname,'/src/scss')]
              }
            }
          ]
        })
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
          },
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new ExtractTextPlugin('styles.[hash:8].css')
  ]
}
