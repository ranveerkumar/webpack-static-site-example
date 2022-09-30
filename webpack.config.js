const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  mode: 'development',
  output: {
	path: `${__dirname}/dist`,
	filename: 'bundle.js'
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
	rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        },
		{
			test: /\.css$/,
			use: [
			MiniCssExtractPlugin.loader,
			'css-loader',
			],
		},
		{
			test: /\.(svg|gif|png|eot|woff|ttf)$/,
			use: [
			'url-loader',
			],
		},
		{
			mimetype: 'image/svg+xml',
			scheme: 'data',
			type: 'asset/resource',
			generator: {
				filename: 'icons/[hash].svg'
			}
		},
		{
			test: /\.(scss)$/,
			use: [
				{
				loader: 'style-loader'
				},
				{
				loader: 'css-loader'
				},
				{
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
					plugins: () => [
						require('autoprefixer')
					]
					}
				}
				},
				{
					loader: miniCssExtractPlugin.loader
				}
			]
		}
	],
  },
  optimization: {
	minimize: true,
	minimizer: [
	  new TerserPlugin({
		extractComments: false,
	  }),
	  new OptimizeCssAssetsPlugin(),
	],
  },
};