import React from 'react'
import { render } from 'react-dom'

let isOpen = false

function handleClick() {
  isOpen = !isOpen
  updateThePage()
}

function ContentToggle() {
  let summaryClassName = 'ContentToggle__Summary'

  if (isOpen)
    summaryClassName += ' ContentToggle__Summary--is-open'

  return (
    <div className="ContentToggle">
      <button onClick={handleClick} className={summaryClassName}>
        Haggis
      </button>
      {isOpen && (
        <div className="ContentToggle__Details">
          <p>Haggis is a savoury pudding containing sheep's pluck (heart, liver and lungs); minced with onion, oatmeal, suet, spices, and salt, mixed with stock, traditionally encased in the animal's stomach though now often in an artificial casing instead. According to the 2001 English edition of the Larousse Gastronomique: "Although its description is not immediately appealing, haggis has an excellent nutty texture and delicious savoury flavour".</p>
        </div>
      )}
    </div>
  )
}

function updateThePage() {
  render(<ContentToggle />, document.getElementById('app'))
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

//const ContentToggle = React.createClass({
//
//  propTypes: {
//    title: React.PropTypes.string.isRequired,
//    onToggle: React.PropTypes.func,
//    children: React.PropTypes.node
//  },
//
//  getInitialState() {
//    return {
//      isOpen: false
//    }
//  },
//
//  handleClick() {
//    this.setState({
//      isOpen: !this.state.isOpen
//    })
//
//    if (this.props.onToggle)
//      this.props.onToggle()
//  },
//
//  render() {
//    let summaryClassName = 'ContentToggle__Summary'
//
//    if (this.state.isOpen)
//      summaryClassName += ' ContentToggle__Summary--is-open'
//
//    return (
//      <div className="ContentToggle">
//        <button onClick={this.handleClick} className={summaryClassName}>
//          {this.props.title}
//        </button>
//        {this.state.isOpen && (
//          <div className="ContentToggle__Details">
//            {this.props.children}
//          </div>
//        )}
//      </div>
//    )
//  }
//
//})
//
//const ToggleTracker = React.createClass({
//
//  getInitialState() {
//    return {
//      numToggles: 0
//    }
//  },
//
//  handleToggle() {
//    this.setState({
//      numToggles: this.state.numToggles + 1
//    })
//  },
//
//  render() {
//    let { children } = this.props
//
//    children = React.Children.map(children, (child) => (
//      React.cloneElement(child, {
//        onToggle: this.handleToggle
//      })
//    ))
//
//    return (
//      <div>
//        <pre>{JSON.stringify(this.state, null, 2)}</pre>
//        {children}
//      </div>
//    )
//  }
//
//})
//
//render((
//  <ToggleTracker>
//    <ContentToggle title="Tacos">
//      <p>A taco is a traditional Mexican dish composed of a corn or wheat tortilla folded or rolled around a filling.</p>
//    </ContentToggle>
//    <ContentToggle title="Burritos">
//      <p>A burrito is a type of Mexican and Tex-Mex food, consisting of a wheat flour tortilla wrapped or folded into a cylindrical shape to completely enclose the filling (in contrast to a taco, which is generally formed by simply folding a tortilla in half around a filling, leaving the semicircular perimeter open).</p>
//    </ContentToggle>
//  </ToggleTracker>
//), document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Wrap <ContentToggle> in a <ToggleTracker> that tracks the # of times it has
// been toggled and shows a counter. <ContentToggle> gets an onToggle handler,
// declared as a function in propTypes.

////////////////////////////////////////////////////////////////////////////////
// React expresses your application UI as a function of state. Props are like
// arguments to the function. They look like element attributes in JSX.

//import md5 from 'md5'
//
//const GravatarURL = 'http://gravatar.com/avatar'
//
//const Gravatar = React.createClass({
//  propTypes: {
//    email: React.PropTypes.string.isRequired
//  },
//  render() {
//    const src = `${GravatarURL}/${md5(this.props.email)}?s=40`
//    return <img src={src} />
//  }
//})
//
//const App = React.createClass({
//  propTypes: {
//    users: React.PropTypes.array
//  },
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
//})
//
//const USERS = [
//  { name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
//  { name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
//]
//
//render(<App users={USERS} />, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Let's use a <Gravatar> component that takes a user's email as a prop and
// automatically generates the <img src> and a size prop. Add a default value
// to the size prop to show it doesn't always need to be passed in.

////////////////////////////////////////////////////////////////////////////////
// Create a custom user propType for <App users>

////////////////////////////////////////////////////////////////////////////////
// Eventually you'll probably end up creating a bunch of custom prop types for
// common types of objects you pass around in your app.
