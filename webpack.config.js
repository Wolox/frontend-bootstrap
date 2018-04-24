'use strict'

const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const glob = require('glob')

/**
 * We need this function to retrieve each page in a multi-page app
 *  without the need to change the config each time we create a new one
 */
const entry = glob
  .sync('./src/**/*.js')
  .reduce(
    (entries, entry) =>
      Object.assign(entries, { [path.parse(entry).name]: entry })
    , { index: path.resolve('/src/index.js') }
  )

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  target: 'web',
  mode: 'development',
  // TODO: add more options to make the build process more readable and enable HMR for nonJS files
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    hot: true,
    https: true
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      /**
       * We need the double Pug config to separate the index file
       * from the another views/templates
       */
      {
        test: /\.pug$/,
        use: [
          /**
           * HTML files will be at the root for the url to be as short as possible
           */
          'file-loader?name=[name].html',
          'extract-loader',
          'html-loader',
          'pug-html-loader'
        ]
      },
      // TODO: Lint the app before building?
      {
        test: /\.js$/,
        exclude: ['node_modules'],
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
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
            loader: 'thread-loader',
            options: {
              workers: 2,
              poolParallelJobs: 50
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname,'src/scss')]
            }
          }
        ]
      },
      /**
       * This loaders are needed to get the necessary styles from external modules
       */
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
        // TODO: add a way to optimize assets size
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  // TODO: add more optimization options
  optimization: {
    splitChunks: {
      chunks: 'async'
    }
  },
  performance: {
    hints: false
  }
}
