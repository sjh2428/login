const path = require("path");

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "public", "javascripts");

module.exports = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "bundle.js"
    },
    devtool: "inline-source-map",
    mode: "development"
}