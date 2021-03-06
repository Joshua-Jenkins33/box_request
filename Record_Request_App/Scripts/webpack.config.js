var path = require("path")
var webpack = require("webpack")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

module.exports = function(env) {
    return {
        devServer: {
            contentBase: "dist",
            stats: {
                warningsFilter: /export .* was not found in/,
            },
        },
        devtool: "inline-source-maps",
        entry: "./src/main.tsx",
        optimization: {
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: false,
        },

        output: {
            filename: "bundle.js",
            path: path.join(__dirname, "dist"),
            pathinfo: false,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                    options: {
                        transpileOnly: true,
                    },
                },
                {
                    test: /\.scss$/,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx"],
        },
        plugins: [
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(env.NODE_ENV),
            }),
            new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
        ],
    }
}
