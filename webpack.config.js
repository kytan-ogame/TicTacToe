const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'main.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: "eval-cheap-module-source-map",
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', {
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')(),
							]
						}
					}
				]
			},
		]
	},
	resolve: {
		alias: {
			'@design': path.resolve(__dirname, 'src/design/'),
			'@js': path.resolve(__dirname, 'src/js/')
		}
	},

	externals: {
		phaser: 'Phaser'
	},
	plugins: [
		new CleanWebpackPlugin({
			verbose: true,
		}),
		new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new HtmlWebpackExternalsPlugin({
			externals: [
				{
					module: 'phaser',
					entry: 'https://cdn.jsdelivr.net/npm/phaser@3.22.0/dist/phaser.min.js',
					global: 'Phaser',
				},
			],
		})
	]

};