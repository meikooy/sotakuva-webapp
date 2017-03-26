import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const env = process.env.NODE_ENV === 'production' ? process.env : dotenv.load();
const envVars = {
  ...env.parsed,
  APP_VERSION: pkg.version
};

const es6dirs = ['src'];
const nodeModulesDir = path.join(__dirname, 'node_modules');

export default {
	target: 'web',
	context: path.resolve(__dirname, './src'),
	entry: {
    index: './index.js'
  },
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: `/js/${pkg.name}-${pkg.version}.js`,
		publicPath: ''
	},
  resolve: {fallback: path.join(__dirname, 'node_modules')},
  resolveLoader: {fallback: path.join(__dirname, 'node_modules')},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': Object.keys(envVars).reduce((env, k) => {
        return {...env, [k]: JSON.stringify(envVars[k])};
      }, {})
	  }),
		new HtmlPlugin({
      inject: false,
			filename: 'index.html',
			template: 'index.html',
      version: pkg.version,
      env: process.env.NODE_ENV || 'development'
		})
	],
	module: {
		preLoaders: [
			{
        test: /\.js$/,
        loader: 'eslint-loader',
        include: es6dirs.map(d => path.resolve(__dirname, d))
      }
		],
		loaders: [
			{
				test: /\.js$/,
				include: es6dirs.map(d => path.resolve(__dirname, d)),
				loader: 'babel',
				query: {
					cacheDirectory: true,
          presets: ['es2015', 'stage-0']
				}
			},
			{
				test: /\.json/,
				exclude: nodeModulesDir,
				loader: 'json'
			},
			{
		    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
		    loader: 'url?&mimetype=application/font-woff'
		  },
			{
		    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		    loader: 'url?&mimetype=application/octet-stream'
		  },
			{
		    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		    loader: 'url?&mimetype=application/vnd.ms-fontobject'
		  },
			{
		    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		    loader: 'url?&mimetype=image/svg+xml'
		  },
			{
		    test: /\.jpg|png$/,
		    loader: 'url'
		  }
		]
	},
	eslint: {
	  configFile: '.eslintrc'
	},
	postcss() {
		return [
			autoprefixer({browsers: ['last 2 versions']})
		];
	}
};
