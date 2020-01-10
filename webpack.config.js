const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    main: './lib/index.js'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: [
          path.join(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ]
  },
};
