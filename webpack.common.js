const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./main.min.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("autoprefixer")
              ]
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./main.min.css"
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      }
    })
  ]
};
