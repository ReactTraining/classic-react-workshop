var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    browserNoActivityTimeout: 30000,
    captureTimeout: 30000,
    frameworks: [ 'mocha' ],
    reporters: [ 'dots' ],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: [ '', '.js', '.jsx' ]
      },
      module: {
        loaders: [
          { test: /\.jsx?$/, loader: 'babel' }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },

    webpackServer: {
      noInfo: true
    }
  });
};
