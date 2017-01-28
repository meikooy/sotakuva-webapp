import path from 'path';
import merge from 'webpack-merge';
import commonConfig from './webpack-common.config';

let config = merge(commonConfig, {
  debug: true,
  devtool: 'module-inline-source-map',
  profile: false,
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  output: {
    pathinfo: true
  },
  devServer: {
    contentBase: 'dist/',
    port: process.env.DEV_PORT || 8080,
    hot: true,
    inline: true,
    historyApiFallback: true,
    colors: true,
    stats: 'normal'
  }
});

config.module.loaders.push(
  {
    test: /\.(css|scss)$/,
    loader: 'style'
            + '!css?sourceMap'
            + '!postcss'
            + '!sass?sourceMap&sourceComments'
  }
);


module.exports = config;
