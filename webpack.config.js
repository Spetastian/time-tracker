const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: './app/',
	context: __dirname,

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [

      /*
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader?fix=true',
        enforce: 'pre'
      },
      */
      
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},

			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},

			{
				test: /\.scss$/,
				loaders: ['style-loader',
					'css-loader?sourceMap&-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
					'postcss-loader',
					'sass-loader?sourceMap']
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: [
					'file-loader?name=[name].[ext]',
					'extract-loader',
					'html-loader'
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader?name=fonts/roboto/[name].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.scss'],
		modules: [
			'node_modules'
		]
	},

	plugins: [
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true
		})
	],

	devtool: 'source-map'
}
