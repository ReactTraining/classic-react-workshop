const fs = require('fs')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

function createMarkup(mainBundle) {
  return ReactDOMServer.renderToStaticMarkup(
    React.DOM.html({},
      React.DOM.head({},
        React.DOM.link({ rel: 'stylesheet', href: '/shared.css' })
      ),
      React.DOM.body({},
        React.DOM.div({ id: 'app' }),
        React.DOM.script({ src: '/__build__/shared.js' }),
        React.DOM.script({ src: '/__build__/' + mainBundle + '.js' })
      )
    )
  )
}

const RootDir = path.resolve(__dirname, '..')
const SubjectsDir = path.join(RootDir, 'subjects')

const Subjects = {
  HelloWorld: 'Hello World',
  Rendering: 'Rendering',
  Components: 'Components',
  PropsVsState: 'Props vs. State',
  ImperativeToDeclarative: 'Imperative to Declarative',
  Forms: 'Forms',
  Testing: 'Testing',
  CompoundComponents: 'Compound Components',
  Context: 'Context',
  HigherOrderComponents: 'Higher Order Components',
  RenderProps: 'Render Props',
  RenderOptimizations: 'Performance and Render Optimizations',
  TweenState: 'TweenState',
  Animation: 'Animation',
  Routing: 'Routing',
  ServerRendering: 'Server Rendering',
  JSONTable: 'JSON Table',
  Select: 'Select',
  Slider: 'Slider',
  Calculator: 'Calculator',
  ChatApp: 'Chat App',
  Cursors: 'Cursors',
  MigratingToReact: 'Migrating to React',
  Redux: 'Redux',
  MiniRedux: 'Implementing Redux'
}

const SubjectDirNames = Object.keys(Subjects)

const markup = ReactDOMServer.renderToStaticMarkup(
  React.DOM.html({},
    React.DOM.head({},
      React.DOM.link({ rel: 'stylesheet', href: '/shared.css' })
    ),
    React.DOM.body({ id: 'index' },
      React.DOM.table({ cellSpacing: 0, cellPadding: 0 },
        React.DOM.tbody({},
          SubjectDirNames.map(function (dir, index) {
            return React.DOM.tr({ key: dir, className: (index % 2) ? 'odd' : 'even' },
              React.DOM.td({ className: 'lecture-link' },
                React.DOM.a({ href: '/' + dir + '/lecture.html' }, Subjects[dir])
              ),
              React.DOM.td({ className: 'exercise-link' },
                React.DOM.a({ href: '/' + dir + '/exercise.html' }, 'exercise')
              ),
              React.DOM.td({ className: 'solution-link' },
                React.DOM.a({ href: '/' + dir + '/solution.html' }, 'solution')
              )
            )
          })
        ) 
      )
    )
  )
)

fs.writeFileSync(path.join(SubjectsDir, 'index.html'), markup)

SubjectDirNames.forEach(function (dir) {
  fs.writeFileSync(path.join(SubjectsDir, dir, 'lecture.html'), createMarkup(dir + '-lecture'))
  fs.writeFileSync(path.join(SubjectsDir, dir, 'exercise.html'), createMarkup(dir + '-exercise'))
  fs.writeFileSync(path.join(SubjectsDir, dir, 'solution.html'), createMarkup(dir + '-solution'))
})
