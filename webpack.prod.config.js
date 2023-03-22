const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleTracker = require('webpack-bundle-tracker')
const path = require('path')

const baseConfig = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const nodeModulesDir = path.resolve(__dirname, 'node_modules')

baseConfig.mode = 'production'
// baseConfig.devtool = 'source-map'

baseConfig.entry = ['whatwg-fetch', '@babel/polyfill', './src/index.js']

baseConfig.output = {
  path: path.resolve('./frontend/build/bundles/'),
  publicPath: '/static/bundles/',
  filename: '[name]-[hash].js'
}

baseConfig.module.rules.push(
  {
    test: /\.jsx?$/,
    exclude: [nodeModulesDir],
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }
  },
  {
    test: /\.(woff(2)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader?name=fonts/[name].[ext]'
  }
)

baseConfig.optimization = {
  minimize: true,
  splitChunks: {
    chunks: 'all'
  }
}

baseConfig.resolve.alias = {
  // "react-dom": "@hot-loader/react-dom",
  '@': path.resolve(__dirname, 'src')
}

baseConfig.plugins = [
  new webpack.DefinePlugin({
    // removes React warnings
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new MiniCssExtractPlugin({
    filename: '[name]-[hash].css',
    disable: false,
    allChunks: true
  }),
  new BundleTracker({
    filename: './webpack-stats.json'
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [autoprefixer]
    }
  }),
  new CleanWebpackPlugin()
]

module.exports = baseConfig
