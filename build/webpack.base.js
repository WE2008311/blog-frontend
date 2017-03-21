const path = require('path');
const buildPath = require('./build-path');

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = Webpack.ProvidePlugin;
const CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = Webpack.DefinePlugin;
// const autoprefixer = require('autoprefixer');

module.exports = {
	// 构建的目标平台为浏览器
	target: 'web',
	// 对第一个编译错误直接编译失败而不是继续编译
	// bail: true,
	// 开启缓存加快构建速度
	cache: true,
	// 项目根目录
	context: buildPath.ROOT_PATH,
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		modules: [buildPath.APP_PATH, buildPath.MODULE_PATH],
		alias: {
			// 参见官方文档standalone vs runtime-only build
			'vue$': 'vue/dist/vue.esm.js',
			'src': buildPath.APP_PATH,
			'assets': buildPath.ASSETS_PATH,
			'components': buildPath.COMPONENT_PATH,
			'style': buildPath.STYLE_PATH
		}
	},
	entry: {
		main: [path.resolve(buildPath.APP_PATH, 'main')],
		backstage: [path.resolve(buildPath.APP_PATH, 'backstage')],
		vender: ['vue', 'zepto-wrapper']
	},
	output: {
		path: buildPath.OUTPUT_PATH,
		filename: 'scripts/[name].js?[chunkhash]',
		chunkFilename: 'scripts/[id].js?[chunkhash]'
	},
	module: {
		rules: [{
			// 会找到.eslintrc
			test: /\.(jsx?|vue)$/,
			enforce: 'pre',
			exclude: buildPath.MODULE_PATH,
			loader: 'eslint-loader',
			options: {
				useEslintrc: true,
				formatter: require('eslint-friendly-formatter')
			}
		}, {
			test: /\.vue$/,
			include: buildPath.APP_PATH,
			loader: 'vue-loader',
			options: {
				// 不需要这个，vue-loader会自动搜索postcss.config.js
				// postcss: [autoprefixer({browsers:['last 3 versions']})]
				loaders: {
					css: ExtractTextPlugin.extract({
						fallback: 'vue-style-loader',
						use: ['css-loader?importLoaders=1&sourceMap', 'postcss-loader']
					}),
					scss: ExtractTextPlugin.extract({
						fallback: 'vue-style-loader',
						use: ['css-loader?importLoaders=2&sourceMap', 'postcss-loader',
							'sass-loader'
						]
					}),
				}
			}
		}, {
			test: /\.jsx?$/,
			include: [buildPath.APP_PATH, path.resolve(buildPath.MODULE_PATH,
				'st-api')],
			loader: 'babel-loader',
			options: {
				presets: ['es2015'],
				plugins: [
					['transform-runtime', {
						polyfill: true
					}]
				],
				cacheDirectory: true
			}
		}, {
			test: /\.css$/,
			// autoprefixer参考postcss-loader官方文档
			// use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader']
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader?importLoaders=1&sourceMap', 'postcss-loader']
			})
		}, {
			test: /\.s[ac]ss$/,
			// use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader?sourceMap']
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader?importLoaders=1&sourceMap', 'postcss-loader',
					'sass-loader'
				]
			})
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			include: buildPath.APP_PATH,
			options: {
				limit: 10000,
				name: 'images/[name].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			include: buildPath.APP_PATH,
			options: {
				limit: 10000,
				name: 'fonts/[name].[ext]'
			}
		}, {
			test: require.resolve('zepto-wrapper'),
			use: [{
				loader: 'expose-loader',
				query: '$'
			}, {
				loader: 'expose-loader',
				query: 'jQuery'
			}]
		}]
	},
	plugins: [
		// 提取第三方模块，参考官方文档，注意是names
		new CommonsChunkPlugin({
			name: 'vender',
			filename: 'scripts/[name].js?[chunkhash]',
			minChunks: Infinity
			// minChunks: function (module) {
			// 	return module.context && module.context.indexOf('node_modules') !== -1;
			// }
		}),
		new CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vender'],
			filename: 'scripts/[name].js?[hash]'
		}),
		new ProvidePlugin({
			$: 'zepto-wrapper',
			jQuery: 'zepto-wrapper',
			'window.jQuery': 'zepto-wrapper'
		}),
		new ExtractTextPlugin({
			filename: 'styles/[name].css?[contenthash]'
		}),
		new HtmlWebpackPlugin({
			title: 'TK Boy',
			filename: 'index.html',
			template: path.resolve(buildPath.APP_PATH, 'index.ejs'),
			favicon: path.resolve(buildPath.APP_PATH, 'assets/favicon-32x32.png'),
			chunks: ['manifest', 'vender', 'main'],
			inject: 'body',
			minify: {
				collapseWhitespace: true,
				minifyJS: true
			}
		}),
		new HtmlWebpackPlugin({
			title: 'TK Boy',
			filename: 'backstage.html',
			template: path.resolve(buildPath.APP_PATH, 'backstage.ejs'),
			favicon: path.resolve(buildPath.APP_PATH, 'assets/favicon-32x32.png'),
			chunks: ['manifest', 'vender', 'backstage'],
			inject: 'body',
			minify: {
				collapseWhitespace: true,
				minifyJS: true
			}
		}),
		new DefinePlugin({
			// 用于调试
			DEBUG: JSON.stringify(process.env.NODE_ENV === 'dev'),
			// 用于生产环境去除vue警告信息,注意双引号一定要用，原因是DefinePlugin是用字符串替换文件内容
			'process.env': {
				NODE_ENV: process.env.NODE_ENV === 'dev' ? '"development"' : '"production"'
			}
		})
	]
};