const path = require("path");

module.exports = {
  mode: "production",
  output: {
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: {
    react: "react",
    "@vkontakte/vkui": "@vkontakte/vkui",
    "@vkontakte/vk-bridge": "@vkontakte/vk-bridge",
    "@vkontakte/icons": "@vkontakte/icons",
  },
};
