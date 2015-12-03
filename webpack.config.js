var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var webpack = require('webpack')
var React = require('react')
var ReactDOMServer = require('react-dom/server')

var SubjectsDir = path.join(__dirname, 'subjects')
var SubjectDirs = fs.readdirSync(SubjectsDir).filter(function (dir) {
  return isDirectory(path.join(SubjectsDir, dir))
})

module.exports = {

  devtool: 'source-map',

  entry: SubjectDirs.reduce(function (entries, dir) {
    if (fs.existsSync(path.join(SubjectsDir, dir, 'exercise.js')))
      entries[dir+ '-exercise'] = path.join(SubjectsDir, dir, 'exercise.js')

    if (fs.existsSync(path.join(SubjectsDir, dir, 'solution.js')))
      entries[dir+ '-solution'] = path.join(SubjectsDir, dir, 'solution.js')

    if (fs.existsSync(path.join(SubjectsDir, dir, 'lecture.js')))
      entries[dir+ '-lecture'] = path.join(SubjectsDir, dir, 'lecture.js')

    return entries
  }, {}),

  output: {
    path: '__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '__build__'
  },

  resolve: {
    extensions: [ '', '.js', '.css' ]
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules|mocha-browser\.js/, loader: 'babel?stage=0&loose=all' },
      { test: /\.woff(2)?$/,   loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'file' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'file' },
      { test: require.resolve('jquery'), loader: 'expose?jQuery' }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ],

  devServer: {
    quiet: false,
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }

}

makeIndex()

function makeIndex() {
  var list = SubjectDirs.map(function (dir) {
    return React.DOM.li({ key: dir },
      React.DOM.a({ href: '/' + dir }, dir.replace(/-/g, ' '))
    )
  })

  var markup = ReactDOMServer.renderToStaticMarkup(
    React.DOM.html({},
      React.DOM.head({},
        React.DOM.link({ rel: 'stylesheet', href: '/shared.css' })
      ),
      React.DOM.body({ id: 'index' },
        React.DOM.ul({}, list)
      )
    )
  )

  fs.writeFileSync('./subjects/index.html', markup)

  SubjectDirs.forEach(function (dir) {
    fs.writeFileSync('./subjects/' + dir + '/index.html', makeMarkup(dir + '-exercise'))
    fs.writeFileSync('./subjects/' + dir + '/solution.html', makeMarkup(dir + '-solution'))
    fs.writeFileSync('./subjects/' + dir + '/lecture.html', makeMarkup(dir + '-lecture'))
  })
}

function makeMarkup(mainFile) {
  return ReactDOMServer.renderToStaticMarkup(
    React.DOM.html({},
      React.DOM.head({},
        React.DOM.link({ rel: 'stylesheet', href: '/shared.css' })
      ),
      React.DOM.body({},
        React.DOM.div({ id: 'app' }),
        React.DOM.script({ src: '/__build__/shared.js' }),
        React.DOM.script({ src: '/__build__/' + mainFile + '.js' })
      )
    )
  )
}

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory()
}
