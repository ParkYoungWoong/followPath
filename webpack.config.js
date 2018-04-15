const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'followPath.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/dist',
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}