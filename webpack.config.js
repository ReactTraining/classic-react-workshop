const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const OpenBrowserWebpackPlugin = require("open-browser-webpack-plugin");

const subjectsDir = path.join(__dirname, "subjects");
const subjectDirs = fs
  .readdirSync(subjectsDir)
  .map(file => path.join(subjectsDir, file))
  .filter(file => fs.lstatSync(file).isDirectory());

module.exports = {
  devtool: "source-map",

  entry: subjectDirs.reduce(
    (entries, dir) => {
      const base = path
        .basename(dir)
        .replace(/\s/g, "-")
        .toLowerCase();

      if (fs.existsSync(path.join(dir, "exercise.js"))) {
        entries[base + "-exercise"] = path.join(dir, "exercise.js");
      }

      if (fs.existsSync(path.join(dir, "solution.js"))) {
        entries[base + "-solution"] = path.join(dir, "solution.js");
      }

      if (fs.existsSync(path.join(dir, "lecture.js"))) {
        entries[base + "-lecture"] = path.join(dir, "lecture.js");
      }

      return entries;
    },
    {
      shared: ["react", "react-dom"]
    }
  ),

  output: {
    path: "__build__",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/__build__/"
  },

  resolve: {
    extensions: ["", ".js", ".css"]
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.js$/,
        exclude: /node_modules|mocha-browser\.js/,
        loader: "babel"
      },
      {
        test: /\.woff(2)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      { test: /\.(ttf|eot|svg|png|jpg)$/, loader: "file" },
      { test: require.resolve("jquery"), loader: "expose?jQuery" }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: "shared" }),
    new OpenBrowserWebpackPlugin("http://localhost:8080")
  ],

  devServer: {
    quiet: false,
    noInfo: false,
    historyApiFallback: {
      rewrites: []
    },
    stats: {
      // Config for minimal console.log mess.
      assets: true,
      colors: true,
      version: true,
      hash: true,
      timings: true,
      chunks: false,
      chunkModules: false
    }
  }
};
