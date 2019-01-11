const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { use: 'babel-loader', test: /\.js$/, exclude: /node_modules/ },
      {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
      {test: /(\.scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {
        test: /\.(jpe?g|ico|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // new FaviconsWebpackPlugin('favicon.ico'),
    // new HtmlWebpackPlugin()
    // new HtmlWebpackPlugin({
    //   // template: 'build/index.html'
    //   favicon: 'client/images/favicon.ico'
    // }),
    new webpack.optimize.UglifyJsPlugin()
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   comments: false,
    //   sourceMap: true,
    //   minimize: false
    // }),
  ],

};
