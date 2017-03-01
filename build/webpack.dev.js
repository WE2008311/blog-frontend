const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '..');
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const ASSETS_PATH = path.resolve(APP_PATH, 'assets');
const COMPONENT_PATH = path.resolve(APP_PATH, 'components');
const STYLE_PATH = path.resolve(APP_PATH, 'style');
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist');

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
	bail: true,
	// 开启缓存加快构建速度
	cache: true,
	// 项目根目录
	context: ROOT_PATH,
	// 开启sourcemap
	devtool: 'cheap-module-source-map',
	devServer: {
		port: 8080,
		// 一定一定要加/!!!
		publicPath: 'http://localhost:8080/',
		contentBase: OUTPUT_PATH,
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
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		modules: [APP_PATH, MODULE_PATH],
		alias: {
			// 参见官方文档standalone vs runtime-only build
			'vue$': 'vue/dist/vue.esm.js',
			'src': APP_PATH,
			'assets': ASSETS_PATH,
			'components': COMPONENT_PATH,
			'style': STYLE_PATH
		}
	},
	entry: {
		main: [path.resolve(APP_PATH, 'main')],
		backstage: [path.resolve(APP_PATH, 'backstage')],
		vender: ['vue', 'zepto-wrapper']
	},
	output: {
		path: OUTPUT_PATH,
		// 一定一定要加/!!!
		publicPath: 'http://localhost:8080/',
		filename: 'scripts/[name].js?[chunkhash]',
		chunkFilename: 'scripts/[id].js?[chunkhash]'
	},
	module: {
		rules: [{
			// 会找到.eslintrc
			test: /\.(jsx?|vue)$/,
			enforce: 'pre',
			exclude: MODULE_PATH,
			loader: 'eslint-loader',
			options: {
				useEslintrc: true,
				formatter: require('eslint-friendly-formatter')
			}
		}, {
			test: /\.vue$/,
			include: APP_PATH,
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
						use: ['css-loader?importLoaders=1&sourceMap', 'postcss-loader', 'sass-loader']
					}),
				}
			}
		}, {
			test: /\.jsx?$/,
			include: [APP_PATH, path.resolve(MODULE_PATH, 'st-api')],
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
			include: APP_PATH,
			options: {
				limit: 10000,
				name: 'images/[name].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			include: APP_PATH,
			options: {
				limit: 10000,
				name: 'fonts/[name].[chunkhash:7].[ext]'
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
		/********for hot middleware ************/
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
		/********************************** */
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
			template: path.resolve(APP_PATH, 'index.ejs'),
			favicon: path.resolve(APP_PATH, 'assets/favicon-32x32.png'),
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
			template: path.resolve(APP_PATH, 'backstage.ejs'),
			favicon: path.resolve(APP_PATH, 'assets/favicon-32x32.png'),
			chunks: ['manifest', 'vender', 'backstage'],
			inject: 'body',
			minify: {
				collapseWhitespace: true,
				minifyJS: true
			}
		}),
		new DefinePlugin({
			DEBUG: JSON.stringify(process.env.NODE_ENV === 'dev')
		})
	]
};