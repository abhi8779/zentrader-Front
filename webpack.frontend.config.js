const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const baseConfig = require('./webpack.base.config')

const nodeModulesDir = path.resolve(__dirname, 'node_modules')

baseConfig.mode = 'development'
baseConfig.devtool = 'source-map'

baseConfig.entry = [
  'react-hot-loader/patch',
  'whatwg-fetch',
  '@babel/polyfill',
  './src/index.js'
]

baseConfig.optimization = {
  splitChunks: {
    chunks: 'all'
  }
}

baseConfig.output = {
  path: path.resolve('./frontend/bundles/'),
  publicPath: 'http://localhost:3000/',
  filename: '[name].js'
}

baseConfig.module.rules.push(
  {
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader']
  },
  {
    test: /\.jsx?$/,
    exclude: [nodeModulesDir],
    loader: require.resolve('babel-loader')
  },
  {
    test: /\.(woff(2)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=100000'
  }
)

baseConfig.plugins = [
  new webpack.ProvidePlugin({
    React: 'react'
  }),
  new webpack.EvalSourceMapDevToolPlugin({
    exclude: /node_modules/
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
  new BundleTracker({
    filename: './webpack-stats.json'
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [autoprefixer]
    }
  }),
  new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /a\.js|node_modules/,
    // add errors to webpack instead of warnings
    failOnError: true,
    // set the current working directory for displaying module paths
    cwd: process.cwd()
  }),
  new HtmlWebpackPlugin({
    template: './frontend/index.html',
    filename: './index.html'
  }),
  new webpack.DefinePlugin({
    // removes React warnings
    'process.env.FRONTEND_ONLY': true
  })
]

baseConfig.resolve.alias = {
  'react-dom': '@hot-loader/react-dom',
  '@': path.resolve(__dirname, 'src/')
}

module.exports = baseConfig
