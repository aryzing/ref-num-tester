var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry:  './src',
  output: {
  path: 'build',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        include: __dirname + '/src',
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('css?camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
        include: __dirname + '/src',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin("modules.css"),
    new CopyWebpackPlugin([
      { from: './src/reset.css'},
      { from: './src/main.css'},
      { from: './src/fonts', to: 'fonts'},
    ])
  ]
};
