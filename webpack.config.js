const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        // loader: 'url-loader?limit=100000'
        use: [{
                loader: 'url-loader',
                options: {
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                }
            }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'build/index.html'
    }),
  ]
};
