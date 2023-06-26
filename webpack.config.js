const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devServer: {
    static: { directory: path.resolve(__dirname, "./src") },
    port: 3000,
  },
  entry: {
    popup: path.resolve(__dirname, "./src/index-popup.js"),
    options: path.resolve(__dirname, "./src/index-options.js"),
    foreground: path.resolve(__dirname, "./src/index-foreground.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                {
                  plugins: ["@babel/plugin-proposal-class-properties"],
                },
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "src/popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: "src/options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      filename: "foreground.html",
      template: "src/foreground.html",
      chunks: ["foreground"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "[name][ext]" },
        { from: "src/background.js", to: "[name][ext]" },
        { from: "src/inject_script.js", to: "[name][ext]" },
        { from: "src/*.png", to: "[name][ext]" },
        { from: "src/*.gif", to: "[name][ext]" },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'REACT_APP_API_URL': JSON.stringify('https://tts-app.site')
      }
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.EnvironmentPlugin({ ...process.env }),

    new CleanWebpackPlugin(),
  ],
};
