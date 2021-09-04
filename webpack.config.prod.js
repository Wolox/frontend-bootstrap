'use strict'

const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const autoprefixer = require('autoprefixer')
const glob = require('glob')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { GenerateSW } = require('workbox-webpack-plugin')

const rootFiles = ['index', 'serviceWorkerInstaller', 'vendor']

const entry = glob
  .sync('./src/**/*.js')
  .reduce((entries, entryFile) => Object.assign(entries, { [path.parse(entryFile).name]: entryFile }), {
    vendor: ['vue']
  })

module.exports = {
  entry,
  output: {
    filename: chunkFileName =>
      rootFiles.some(file => file === chunkFileName.chunk.name) ? '[name].js' : '[name]/[name].js',
    path: path.resolve(__dirname, 'build')
  },
  target: 'web',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        enforce: 'pre',
        test: /\.pug$/,
        exclude: /node_modules/,
        use: {
          loader: 'vue-pug-lint-loader',
          options: require('./.pug-lintrc.json')
        }
      },
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: 'pug-plain-loader'
          },
          // this applies to pug imports inside JavaScript
          {
            use: [
              {
                loader: 'file-loader',
                options: {
                  name(file) {
                    return file.includes('index') ? '[name].html' : '[name]/index.html'
                  }
                }
              },
              'pug-plain-loader'
            ]
          }
        ]
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
        include: path.resolve(__dirname, 'src'),
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
        test: /\.(jpg|png|gif|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/[name].[ext]',
              fallback: 'file-loader'
            }
          },
          'image-webpack-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'vue-svg-loader',
            options: {
              svgo: {
                plugins: [
                  {cleanupIDs: false},
                  {convertPathData: false},
                  {mergePaths: false}
                ]
              }
            }
          },
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/[name].[ext]',
              fallback: 'file-loader'
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new VueLoaderPlugin(),
    /**
     * Known issue for the CSS Extract Plugin in Ubuntu 16.04: You'll need to install
     * the following package: sudo apt-get install libpng16-dev
     */
    new MiniCssExtractPlugin({
      filename: 'styles.[name].css'
    }),
    new GenerateSW({
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: 'cacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 10
          }
        }
      }]
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
