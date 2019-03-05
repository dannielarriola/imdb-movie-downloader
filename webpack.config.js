/* webpack.config.js */
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "production",
    // Tell webpack to begin building its 
    // dependency graph from this file.
    entry: path.join(__dirname, 'main.jsx'),
    // And to place the output in the `build` directory
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'imdb-movie-downloader.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                /* We'll leave npm packages as is and not 
                   parse them with Babel since most of them 
                   are already pre-transpiled anyway. */
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: 'manifest.json', to: 'manifest.json' },
            { from: 'img', to: 'img' }
        ]),
    ]
}