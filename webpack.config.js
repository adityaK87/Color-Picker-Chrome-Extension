const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/test.tsx",
	module: {
		rules: [
			{
				use: "ts-loader",
				test: /\.tsx/,
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve("src/manifest.json"),
					to: path.resolve("dist"),
				},
			],
		}),
	],
	resolve: {
		extension: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "index.js",
	},
};
