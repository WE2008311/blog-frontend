const Webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const buildPath = require('./build-path');
const DefinePlugin = Webpack.DefinePlugin;
const PUBLIC_PATH = 'http://localhost:8080/';

/********for hot middleware ************/
baseConfig.plugins.unshift(new Webpack.HotModuleReplacementPlugin(), new Webpack.NoEmitOnErrorsPlugin());

baseConfig.output.publicPath = PUBLIC_PATH;

const config = {
	// 开启sourcemap
	devtool: 'cheap-module-source-map',
	devServer: {
		port: 8080,
		// 一定一定要加/!!!
		publicPath: PUBLIC_PATH,
		contentBase: buildPath.OUTPUT_PATH,
		// clientLogLevel: "warning",
		compress: true,
		hot: true,
		noInfo: true,
		inline: true,
		stats: {
			colors: true
		},
		watchOptions: {
			// 聚合500ms内的文件变动一起编译
			aggregateTimeout: 500,
			// 1000ms轮询一次文件变动
			poll: 1000
		}
		// headers: {
		// 	"X-Custom-Header": "yes"
		// },
		// proxy: {
		// 	'**': {
		// 		target: 'http://localhost:80'
		// 	}
		// },
	},
};

module.exports = merge(baseConfig, config);