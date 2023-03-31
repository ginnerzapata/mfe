const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationFile = require("webpack/lib/container/ModuleFederationPlugin");
const packegeJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationFile({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packegeJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
