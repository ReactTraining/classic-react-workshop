import React from 'react'
import { render } from 'react-dom'

let isOpen = false

function handleClick() {
  isOpen = !isOpen
  updateThePage()
}

function App() {
  let summaryClassName = 'ContentToggle__Summary'

  if (isOpen)
    summaryClassName += ' ContentToggle__Summary--is-open'

  return (
    <div className="ContentToggle">
      <button onClick={handleClick} className={summaryClassName}>
        Tacos
      </button>
      {isOpen && (
        <div className="ContentToggle__Details">
          <p>
            A taco is a traditional Mexican dish composed of a corn or wheat
            tortilla folded or rolled around a filling.
          </p>
        </div>
      )}
    </div>
  )
}

function updateThePage() {
  render(<App />, document.getElementById('app'))
}

updateThePage()

////////////////////////////////////////////////////////////////////////////////
// Let's encapsulate state in an object and call it what it really is. Then, add
// a setState function that we can use to update state and automatically update
// the page any time the state changes.

//////////////////////////////////////////////////////////////////////////////////
// React gives us setState and automatically re-renders as the state changes.

////////////////////////////////////////////////////////////////////////////////
// Let's make <ContentToggle> re-usable and render a few of them. Title and
// children are properties we can pass in from the parent component.

////////////////////////////////////////////////////////////////////////////////
// Wrap <ContentToggle> in a <ToggleTracker> that tracks the # of times it has
// been toggled and shows a counter. <ContentToggle> gets an onToggle handler,
// declared as a function in propTypes.

////////////////////////////////////////////////////////////////////////////////
// React expresses your application UI as a function of state. Props are like
// arguments to the function. They look like element attributes in JSX.

////////////////////////////////////////////////////////////////////////////////
// Let's use a <Gravatar> component that takes a user's email as a prop and
// automatically generates the <img src> and a size prop. Add a default value
// to the size prop to show it doesn't always need to be passed in.

//import isEmail from './utils/isEmail'
//
//function email(props, propName, componentName) {
//  const value = props[propName]
//
//  if (value !== undefined && !isEmail(value))
//    return new Error(`Invalid prop "${propName}" given to "${componentName}", "${value}" does not look like an email address"`)
//}
//
//email.isRequired = function (props, propName, componentName) {
//  const value = props[propName]
//
//  if (value == null)
//    return new Error(`Required prop "${propName}" was not specified in "${componentName}"`)
//
//  return email.apply(this, arguments)
//}
//
//import md5 from 'md5'
//
//const GRAVATAR_URL = 'http://gravatar.com/avatar'
//
//class Gravatar extends React.Component {
//  static propTypes = {
//    email: email.isRequired,
//    size: React.PropTypes.number.isRequired
//  }
//  static defaultProps = {
//    size: 80
//  }
//  render() {
//    const src = `${GRAVATAR_URL}/${md5(this.props.email)}?s=${this.props.size}`
//    return <img src={src} />
//  }
//}
//
//class App extends React.Component {
//  render() {
//    return (
//      <div>
//        <h1>Users</h1>
//        <ul>
//          {this.props.users.map(user => (
//            <li key={user.email}>
//              <Gravatar email={user.email} /> {user.name}
//            </li>
//          ))}
//        </ul>
//      </div>
//    )
//  }
//}
//
//const USERS = [
//  { name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
//  { name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
//]
//
//render(<App users={USERS} />, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// We can have better validation with a custom prop

////////////////////////////////////////////////////////////////////////////////
// Eventually you'll probably end up creating a bunch of custom prop types for
// common types of objects you pass around in your app.
