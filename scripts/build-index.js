const fs = require('fs')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const createMarkup = (mainFile) =>
  ReactDOMServer.renderToStaticMarkup(
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

const RootDir = path.resolve(__dirname, '..')
const SubjectsDir = path.join(RootDir, 'subjects')

const Subjects = {
  HelloWorld: 'Hello World',
  Rendering: 'Rendering',
  Components: 'Components',
  PropsVsState: 'Props vs. State',
  ImperativeToDeclarative: 'Imperative to Declarative',
  CompoundComponents: 'Compound Components',
  Context: 'Context',
  RenderProps: 'Render Props',
  RenderOptimizations: 'Render Optimizations',
  TweenState: 'TweenState',
  Animation: 'Animation',
  Testing: 'Testing',
  Routing: 'Routing',
  Flux: 'Flux',
  MiniRedux: 'Mini Redux',
  Redux: 'Redux',
  ServerRendering: 'Server Rendering',
  Forms: 'Forms',
  JSONTable: 'JSON Table',
  Select: 'Select',
  Slider: 'Slider',
  ChatApp: 'Chat App',
  Cursors: 'Cursors',
  MigratingToReact: 'Migrating to React',
  Perf: 'Perf'
}

const SubjectDirNames = Object.keys(Subjects)

const markup = ReactDOMServer.renderToStaticMarkup(
  React.DOM.html({},
    React.DOM.head({},
      React.DOM.link({ rel: 'stylesheet', href: '/shared.css' })
    ),
    React.DOM.body({ id: 'index' },
      React.DOM.ul({},
        SubjectDirNames.map(dir => (
          React.DOM.li({ key: dir },
            React.DOM.a({ href: '/' + dir }, Subjects[dir])
          )
        ))
      )
    )
  )
)

fs.writeFileSync(path.join(SubjectsDir, 'index.html'), markup)

SubjectDirNames.forEach(dir => {
  fs.writeFileSync(path.join(SubjectsDir, dir, 'index.html'), createMarkup(dir + '-exercise'))
  fs.writeFileSync(path.join(SubjectsDir, dir, 'solution.html'), createMarkup(dir + '-solution'))
  fs.writeFileSync(path.join(SubjectsDir, dir, 'lecture.html'), createMarkup(dir + '-lecture'))
})
