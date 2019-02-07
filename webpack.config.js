const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    module: {
        rules: [{

                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                // make debugging easy
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: [/\.scss$/,/\.css$/],
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    }
}