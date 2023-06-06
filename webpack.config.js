const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const { title } = require("process");

module.exports = {
	mode: "development",
	devtool: "cheap-module-source-map",
	entry: {
		popup: path.resolve("./src/popup/popup.tsx"),
		options: path.resolve("./src/options/options.tsx"),
		background: path.resolve("./src/background/background.ts"),
		contentScript: path.resolve("./src/contentScript/contentScript.ts"),
	},
	module: {
		rules: [
			{
				use: "ts-loader",
				test: /\.tsx/,
				exclude: /node_modules/,
			},
			{
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								indent: "postcss",
								plugins: [tailwindcss, autoprefixer],
							},
						},
					},
				],
				test: /\.css$/i,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve("src/static"),
					to: path.resolve("dist"),
				},
				// {
				// 	from: path.resolve("src/static/icon.png"),
				// 	to: path.resolve("dist"),
				// },
			],
		}),
		...getHtmlPlugins(["popup", "options"]),
		// new HtmlWebpackPlugin({
		// 	title: "react Chrome extension",
		// 	filename: "popup.html",
		// 	chunks: ["popup"],
		// }),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "[name].js",
	},
};

function getHtmlPlugins(chunks) {
	return chunks.map((chunk) => {
		return new HtmlWebpackPlugin({
			title: "React Chrome Extension",
			filename: `${chunk}.html`,
			chunks: [chunk],
		});
	});
}
