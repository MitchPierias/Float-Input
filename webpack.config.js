const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'examples/src/index.html'),
    filename: './index.html'
});

module.exports = {
	entry: path.join(__dirname, 'examples/src/index.js'),
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.ts','.tsx','.js','.jsx']
	},
	module: {
		rules: [
			{
				test:  /\.(ts|tsx)$/,
				use: 'ts-loader'
			}, {
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: [
					/(node_modules)/,
					/.json?/
				]
			}, {
				test: /\.css$/,
				use: [
					{
						loader:'style-loader'
					}, {
						loader:'css-loader',
						options: {
							localIdentName: '[path][name]_[local]-[hash:base64:5]'
						}
					}
				]
			}
		]
	},
	plugins: [
		htmlWebpackPlugin
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'lib'),
		port: 3001
	}
}