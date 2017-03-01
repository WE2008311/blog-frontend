const baseConfig = require('./webpack.base');
const Webpack = require('webpack');
const UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
const merge = require('webpack-merge');
const PUBLIC_PATH = '/';

baseConfig.plugins.push(
	new UglifyJsPlugin({
		compress: {
			warnings: false
		},
		sourceMap: true
	})
)
baseConfig.output.publicPath = PUBLIC_PATH;

const config = {
	// 开启sourcemap
	devtool: 'source-map'
};

module.exports = merge(baseConfig, config);