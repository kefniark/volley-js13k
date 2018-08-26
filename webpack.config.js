
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, './dist')
	},
	devtool: false,
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'My App',
			template: 'src/index.html',
			inject: 'body',
			minify: true
		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets', to: 'assets', type: 'dir' },
		], {})
	],
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
	devServer: {
		stats: 'minimal',
		overlay: true,
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	}
}
