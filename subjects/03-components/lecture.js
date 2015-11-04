import React from 'react'
import { render } from 'react-dom'

////////////////////////////////////////////////////////////////////////////////
// Let's encapsulate state in an object and call it what it really is. Then, add
// a setState function that we can use to update state and automatically update
// the page any time the state changes.

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
  render(<App/>, document.getElementById('app'))
}

updateThePage()



//const state = {
  //isOpen: false
//}

//function setState(nextState) {
  //for (const property in nextState)
    //state[property] = nextState[property]
  //updateThePage()
//}

//function handleClick() {
  //setState({
    //isOpen: !state.isOpen
  //})
//}

//function App() {
  //return (
    //<div className="ContentToggle">
      //<button onClick={handleClick} className="ContentToggle__Summary">
        //Tacos
      //</button>
      //<div className="ContentToggle__Details">
        //{state.isOpen && (
          //<p>
            //A taco is a traditional Mexican dish composed of a corn or wheat
            //tortilla folded or rolled around a filling.
          //</p>
        //)}
      //</div>
    //</div>
  //)
//}

//function updateThePage() {
  //render(<App/>, document.getElementById('app'))
//}

//updateThePage()

//////////////////////////////////////////////////////////////////////////////////
//// React gives us setState and automatically re-renders as the state changes
//class ContentToggle extends React.Component {

  //constructor(props) {
    //super(props)
    //this.state = {
      //isOpen: false
    //}
  //}

  //handleClick() {
    //this.setState({
      //isOpen: !this.state.isOpen
    //})
  //}

  //render() {
    //return (
      //<div className="ContentToggle">
        //<button onClick={() => this.handleClick()} className="ContentToggle__Summary">
          //Tacos
        //</button>
        //<div className="ContentToggle__Details">
          //{this.state.isOpen && (
            //<p>
              //A taco is a traditional Mexican dish composed of a corn or wheat
              //tortilla folded or rolled around a filling.
            //</p>
          //)}
        //</div>
      //</div>
    //)
  //}

//}

//render(<ContentToggle/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Wrap <ContentToggle> in an <App> that tracks the # of times it has been
// toggled and shows a counter. ContentToggle gets an onToggle handler, declared
// as a function in propTypes
// Real use case might be analytics

//class ContentToggle extends React.Component {

  //static propTypes = {
    //onToggle: React.PropTypes.func
  //}

  //constructor(props) {
    //super(props)
    //this.state = {
      //isOpen: false
    //}
  //}

  //handleClick() {
    //this.setState({
      //isOpen: !this.state.isOpen
    //})

    //if (this.props.onToggle)
      //this.props.onToggle()
  //}

  //render() {
    //return (
      //<div className="ContentToggle">
        //<button onClick={() => this.handleClick()} className="ContentToggle__Summary">
          //Tacos
        //</button>
        //<div className="ContentToggle__Details">
          //{this.state.isOpen && (
            //<p>
              //A taco is a traditional Mexican dish composed of a corn or wheat
              //tortilla folded or rolled around a filling.
            //</p>
          //)}
        //</div>
      //</div>
    //)
  //}

//}

//class App extends React.Component {

  //constructor(props) {
    //super(props)
    //this.state = {
      //numToggles: 0
    //}
  //}

  //handleToggle() {
    //this.setState({
      //numToggles: this.state.numToggles + 1
    //})
  //}

  //render() {
    //return (
      //<div>
        //<p>Toggle count: {this.state.numToggles}</p>
        //<ContentToggle onToggle={() => this.handleToggle()}/>
      //</div>
    //)
  //}

//}

//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Let's make ContentToggle re-usable and render a few of them. Summary and
// children are properties we can pass in from the parent component. Use
// this.props.children to render any components/text that were passed to
// the component as children

//class ContentToggle extends React.Component {

  //static propTypes = {
    //summary: React.PropTypes.string,
    //onToggle: React.PropTypes.func
  //}

  //constructor(props) {
    //super(props)
    //this.state = {
      //isOpen: false
    //}
  //}

  //handleClick() {
    //this.setState({
      //isOpen: !this.state.isOpen
    //})

    //if (this.props.onToggle)
      //this.props.onToggle()
  //}

  //render() {
    //return (
      //<div className="ContentToggle">
        //<button onClick={() => this.handleClick()} className="ContentToggle__Summary">
          //{this.props.summary}
        //</button>
        //<div className="ContentToggle__Details">
          //{this.state.isOpen && this.props.children}
        //</div>
      //</div>
    //)
  //}

//}

//class App extends React.Component {

  //constructor(props) {
    //super(props)
    //this.handleToggle = this.handleToggle.bind(this)
    //this.state = {
      //numToggles: 0
    //}
  //}

  //handleToggle() {
    //this.setState({
      //numToggles: this.state.numToggles + 1
    //})
  //}

  //render() {
    //return (
      //<div>
        //<p>Toggle count: {this.state.numToggles}</p>
        //<ContentToggle summary="Tacos" onToggle={this.handleToggle}>
          //<p>
            //A taco is a traditional Mexican dish composed of a corn or wheat
            //tortilla folded or rolled around a filling.
          //</p>
        //</ContentToggle>
        //<ContentToggle summary="Burritos" onToggle={this.handleToggle}>
          //<p>
            //A burrito is a Mexican dish consisting of a tortilla rolled around
            //a filling, typically of beans or ground or shredded beef.
          //</p>
        //</ContentToggle>
        //<ContentToggle summary="Enchiladas" onToggle={this.handleToggle}>
          //<p>
            //An enchilada is a rolled tortilla with a filling typically of meat
            //and served with a chili sauce.
          //</p>
        //</ContentToggle>
      //</div>
    //)
  //}

//}

//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// React expresses your application UI as a function of state. Props are like
// arguments to the function. They look like element attributes in JSX

//import md5 from 'md5'

//const GRAVATAR_URL = 'http://gravatar.com/avatar'
//const USERS = [
  //{ name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
  //{ name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
//]

//class App extends React.Component {
  //render() {
    //return (
      //<div>
        //<h1>Users</h1>
        //<ul>
        //{USERS.map(user => (
          //<li key={user.email}>
            //<img src={GRAVATAR_URL + '/' + md5(user.email)}/> {user.name}
          //</li>
        //))}
        //</ul>
      //</div>
    //)
  //}
//}

//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// We can refactor to get a <Gravatar> component that takes a user's email as
// a prop and automatically generates the <img src> and a size prop

//import md5 from 'md5'

//const GRAVATAR_URL = 'http://gravatar.com/avatar'
//const USERS = [
  //{ name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
  //{ name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
//]

//class Gravatar extends React.Component {

  //static propTypes = {
    //email: React.PropTypes.string.isRequired,
    //size: React.PropTypes.number.isRequired,
  //}

  //static defaultProps = {
    //size: 80
  //}

  //render() {
    //const src = `${GRAVATAR_URL}/${md5(this.props.email)}?s=${this.props.size}`
    //return <img src={src}/>
  //}

//}

//class App extends React.Component {

  //render() {
    //return (
      //<div>
        //<h1>Users</h1>
        //<ul>
          //{USERS.map(user => (
            //<li key={user.email}>
              //<Gravatar email={user.email}/> {user.name}
            //</li>
          //))}
        //</ul>
      //</div>
    //)
  //}

//}

//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// We can have better validation with a custom prop

//import md5 from 'md5'
//import isEmail from './utils/isEmail'

//const GRAVATAR_URL = 'http://gravatar.com/avatar'
//const USERS = [
  //{ name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
  //{ name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
//]

//const Gravatar = React.createClass({
  //static propTypes = {
    //email(props, propName, componentName) {
      //const value = props[propName]

      //if (value !== undefined && !isEmail(value))
        //return new Error(`Invalid prop "${propName}" given to "${componentName}", "${value}" does not look like an email address"`)
    //},
    //size: React.PropTypes.number.isRequired
  //}

  //static defaultProps = {
    //size: 80
  //}

  //render() {
    //const src = `${GRAVATAR_URL}/${md5(this.props.email)}?s=${this.props.size}`
    //return <img src={src}/>
  //}

//}

//class App extends React.Component {

  //render() {
    //return (
      //<div>
        //<h1>Users</h1>
        //<ul>
          //{USERS.map(user => (
            //<li key={user.email}>
              //<Gravatar email={user.email}/> {user.name}
            //</li>
          //))}
        //</ul>
      //</div>
    //)
  //}

//}

//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Eventually you'll probably end up creating a bunch of custom prop types for
// common types of objects you pass around in your app

//const PropTypes = {

  //email (props, propName, componentName) {
    //const value = props[propName]
    //if (value !== undefined && !isEmail(value))
      //return new Error(`Invalid prop "${propName}" given to "${componentName}", "${value}" does not look like an email address"`)
  //}

//}

//PropTypes.email.isRequired = function (props, propName, componentName) {
  //const value = props[propName]
  //if (value === undefined)
    //return new Error(`Required prop "${propName}" was not specified in "${componentName}".`)
//}
