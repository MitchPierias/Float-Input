const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'examples/src/index.html'),
    filename: './index.html'
});

module.exports = {
	mode: 'production',
	entry: path.join(__dirname, 'examples/src/index.js'),
	output: {
		path: path.resolve('lib'),
		filename: 'FlowInput.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules)/
			},
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			}
		]
	},
	plugins: [htmlWebpackPlugin],
	resolve: {
		extensions: ['.js','.jsx']
	},
	devServer: {
		port: 3001
	}
}