const path = require("path");
const common = require("./webpack.common")
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(
  common,
  {
    mode: "production",
    output: {
      filename: "[name].[contenthash].bundle.js",
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: "images/[name].[contenthash][ext]"
    },
    optimization: {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
        `...`,
        new CssMinimizerPlugin(),
        new HtmlWebpackPlugin({
          template: "./src/template.html",
          minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true
          }
        })
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(
        {
          filename: "[name].[contenthash].css"
        }
      ),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, //3. Extract CSS into files
            "css-loader", //2. Turns css into commonjs
            "sass-loader"  //1. Turns sass into css
          ]
        },
      ]
    }
  }
);
