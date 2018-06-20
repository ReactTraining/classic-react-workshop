const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const subjectsDir = path.join(__dirname, "subjects");
const subjectDirs = fs
  .readdirSync(subjectsDir)
  .map(file => path.join(subjectsDir, file))
  .filter(file => fs.lstatSync(file).isDirectory());

module.exports = {
  mode: "development",
  devtool: "source-map",

  entry: subjectDirs.reduce(
    (chunks, dir) => {
      const base = path.basename(dir);

      ["lecture", "exercise", "solution"].forEach(name => {
        const file = path.join(dir, `${name}.js`);

        if (fs.existsSync(file)) {
          chunks[`${base}-${name}`] = file;
        }
      });

      return chunks;
    },
    {
      main: path.join(subjectsDir, "index.js")
    }
  ),

  optimization: {
    splitChunks: {
      chunks: "all",
      name: "shared"
    }
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|mocha-browser\.js/,
        loader: "babel-loader"
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(ttf|eot|svg|png|jpg)$/, loader: "file-loader" },
      {
        test: /\.woff(2)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: require.resolve("jquery"),
        loader: "expose-loader?jQuery"
      }
    ]
  },

  devServer: {
    open: true,
    quiet: false
  },

  plugins: [
    ...subjectDirs.reduce((chunks, dir) => {
      const base = path.basename(dir);

      ["lecture", "exercise", "solution"].forEach(name => {
        const filename = path.join(base, `${name}.html`);
        const template = path.join("public", filename);
        if (fs.existsSync(template)) {
          chunks.push(
            new HtmlWebpackPlugin({
              chunks: [`${base}-${name}`, "shared"],
              filename,
              template
            })
          );
        }
      });

      return chunks;
    }, []),
    new HtmlWebpackPlugin({
      chunks: ["shared", "main"],
      filename: "index.html",
      template: "public/index.html"
    })
  ],

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
};
