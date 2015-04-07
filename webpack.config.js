var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var webpack = require('webpack');
var React = require('react');

var CODE = __dirname+'/subjects';
var IGNORE = [];
var DIRS = fs.readdirSync(CODE).filter(function (dir) {
  return isDirectory(path.join(CODE, dir)) && IGNORE.indexOf(dir) === -1;
});

makeIndex();

module.exports = {

  devtool: 'eval',

  entry: DIRS.reduce(function (entries, dir) {
    entries[dir+'-exercise'] = path.join(CODE, dir, 'exercise.js');
    entries[dir+'-lecture'] = path.join(CODE, dir, 'lecture.js');
    return entries;
  }, {}),

  output: {
    path: '__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '__build__'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]

};

function makeIndex() {
  var list = DIRS.map(function (dir) {
    return React.DOM.li({}, React.DOM.a({href: '/'+dir}, dir.replace(/-/g, ' ')));
  });
  var markup = React.renderToStaticMarkup((
    React.DOM.html({},
      React.DOM.link({rel: 'stylesheet', href: '/shared.css'}),
      React.DOM.body({id: 'index'},
        React.DOM.ul({}, list)
      )
    )
  ));
  fs.writeFileSync('./subjects/index.html', markup);

  DIRS.forEach(function (dir) {
    fs.writeFileSync('./subjects/'+dir+'/index.html', makeMarkup(dir+'-exercise'));
    fs.writeFileSync('./subjects/'+dir+'/lecture.html', makeMarkup(dir+'-lecture'));
  });
}

function makeMarkup(mainFile) {
  return React.renderToStaticMarkup((
    React.DOM.html({},
      React.DOM.link({rel: 'stylesheet', href: '/shared.css'}),
      React.DOM.body({},
        React.DOM.div({ id: 'app' }),
        React.DOM.script({src: '/__build__/shared.js'}),
        React.DOM.script({src: '/__build__/'+mainFile+'.js'})
      )
    )
  ));
}

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}
