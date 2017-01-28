import merge from 'webpack-merge';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import commonConfig from './webpack-common.config.js';
import pkg from './package.json';


let config = merge(commonConfig, {
  debug: false,
  devtool: 'cheap-module-source-map',
  profile: true,
  watch: false,
  output: {
    publicPath: ''
  },
  module: {
    postLoaders: []
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]
});


config.module.loaders.push(
  {
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      'css-loader?sourceMap&modules&importLoaders=1&'
        + 'localIdentName=[local]'
        + '!postcss-loader!sass-loader?sourceMap'
    ),
  }
);

config.plugins.push(
  new ExtractTextPlugin(
    `/css/${pkg.name}-${pkg.version}.css`,
    {allChunks: true}
  )
);


if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
        semicolons: true
      },
      sourceMap: false
    })
  );
}


module.exports = config;
