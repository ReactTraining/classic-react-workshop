import React from 'react';

////////////////////////////////////////////////////////////////////////////////
// Let's encapsulate state in an object and call it what it really is. Then, add
// a setState function that we can use to update state and automatically update
// the page any time the state changes.

// var state = {
//   isOpen: false
// };
//
// function setState(nextState) {
//   for (var property in nextState)
//     if (nextState.hasOwnProperty(property))
//       state[property] = nextState[property];
//
//   updateThePage();
// }
//
// function handleClick() {
//   setState({
//     isOpen: !state.isOpen
//   });
// }
//
// function render() {
//   return (
//     <div className="ContentToggle">
//       <button onClick={handleClick} className="ContentToggle__Summary">
//         Tacos
//       </button>
//       <div className="ContentToggle__Details">
//         {state.isOpen && (
//           <p>
//             A taco is a traditional Mexican dish composed of a corn or wheat
//             tortilla folded or rolled around a filling. A taco can be made with a
//             variety of fillings, including beef, pork, chicken, seafood,
//             vegetables and cheese, allowing for great versatility and variety. A
//             taco is generally eaten without utensils and is often accompanied
//             by garnishes such as salsa, avocado or guacamole, cilantro
//             (coriander), tomatoes, minced meat, onions and lettuce.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
//
// function updateThePage() {
//   React.render(render(), document.getElementById('app'));
// }
//
// updateThePage();

////////////////////////////////////////////////////////////////////////////////
// React gives us setState and automatically re-renders as the state changes

// var ContentToggle = React.createClass({
//
//   getInitialState() {
//     return {
//       isOpen: false
//     };
//   },
//
//   handleClick() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   },
//
//   render() {
//     return (
//       <div className="ContentToggle">
//         <button onClick={this.handleClick} className="ContentToggle__Summary">
//           Tacos
//         </button>
//         <div className="ContentToggle__Details">
//           {this.state.isOpen && (
//             <p>
//               A taco is a traditional Mexican dish composed of a corn or wheat
//               tortilla folded or rolled around a filling. A taco can be made with a
//               variety of fillings, including beef, pork, chicken, seafood,
//               vegetables and cheese, allowing for great versatility and variety. A
//               taco is generally eaten without utensils and is often accompanied
//               by garnishes such as salsa, avocado or guacamole, cilantro
//               (coriander), tomatoes, minced meat, onions and lettuce.
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   }
//
// });
//
// React.render(<ContentToggle/>, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// Wrap <ContentToggle> in an <App> that tracks the # of times it has been
// toggled and shows a counter. ContentToggle gets an onToggle handler, declared
// as a function in propTypes
// Real use case might be analytics

// var ContentToggle = React.createClass({
//
//   propTypes: {
//     onToggle: React.PropTypes.func
//   },
//
//   getInitialState() {
//     return {
//       isOpen: false
//     };
//   },
//
//   handleClick() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//
//     if (this.props.onToggle)
//       this.props.onToggle();
//   },
//
//   render() {
//     return (
//       <div className="ContentToggle">
//         <button onClick={this.handleClick} className="ContentToggle__Summary">
//           Tacos
//         </button>
//         <div className="ContentToggle__Details">
//           {this.state.isOpen && (
//             <p>
//               A taco is a traditional Mexican dish composed of a corn or wheat
//               tortilla folded or rolled around a filling. A taco can be made with a
//               variety of fillings, including beef, pork, chicken, seafood,
//               vegetables and cheese, allowing for great versatility and variety. A
//               taco is generally eaten without utensils and is often accompanied
//               by garnishes such as salsa, avocado or guacamole, cilantro
//               (coriander), tomatoes, minced meat, onions and lettuce.
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   }
//
// });
//
// var App = React.createClass({
//
//   getInitialState() {
//     return {
//       numToggles: 0
//     };
//   },
//
//   handleToggle() {
//     this.setState({
//       numToggles: this.state.numToggles + 1
//     });
//   },
//
//   render() {
//     return (
//       <div>
//         <p>Toggle count: {this.state.numToggles}</p>
//         <ContentToggle onToggle={this.handleToggle}/>
//       </div>
//     );
//   }
//
// });
//
// React.render(<App/>, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// Let's make ContentToggle re-usable and render a few of them. Summary and
// children are properties we can pass in from the parent component. Use
// this.props.children to render any components/text that were passed to
// the component as children

// var ContentToggle = React.createClass({
//
//   propTypes: {
//     summary: React.PropTypes.string,
//     onToggle: React.PropTypes.func
//   },
//
//   getInitialState() {
//     return {
//       isOpen: false
//     };
//   },
//
//   handleClick() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//
//     if (this.props.onToggle)
//       this.props.onToggle();
//   },
//
//   render() {
//     return (
//       <div className="ContentToggle">
//         <button onClick={this.handleClick} className="ContentToggle__Summary">
//           {this.props.summary}
//         </button>
//         <div className="ContentToggle__Details">
//           {this.state.isOpen && this.props.children}
//         </div>
//       </div>
//     );
//   }
//
// });
//
// var App = React.createClass({
//
//   getInitialState() {
//     return {
//       numToggles: 0
//     };
//   },
//
//   handleToggle() {
//     this.setState({
//       numToggles: this.state.numToggles + 1
//     });
//   },
//
//   render() {
//     return (
//       <div>
//         <p>Toggle count: {this.state.numToggles}</p>
//         <ContentToggle summary="Tacos" onToggle={this.handleToggle}>
//           <p>
//             A taco is a traditional Mexican dish composed of a corn or wheat
//             tortilla folded or rolled around a filling.
//           </p>
//         </ContentToggle>
//         <ContentToggle summary="Burritos" onToggle={this.handleToggle}>
//           <p>
//             A burrito is a Mexican dish consisting of a tortilla rolled around
//             a filling, typically of beans or ground or shredded beef.
//           </p>
//         </ContentToggle>
//         <ContentToggle summary="Enchiladas" onToggle={this.handleToggle}>
//           <p>
//             An enchilada is a rolled tortilla with a filling typically of meat
//             and served with a chili sauce.
//           </p>
//         </ContentToggle>
//       </div>
//     );
//   }
//
// });
//
// React.render(<App/>, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// React expresses your application UI as a function of state. Props are like
// arguments to the function. They look like element attributes in JSX

// import MD5 from 'MD5';
//
// var GRAVATAR_URL = 'http://gravatar.com/avatar';
// var USERS = [
//   { name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
//   { name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
// ];
//
// var App = React.createClass({
//   render () {
//     return (
//       <div>
//         <h1>Users</h1>
//         <ul>
//         {USERS.map(user => (
//           <li key={user.email}>
//             <img src={GRAVATAR_URL + '/' + MD5(user.email)}/> {user.name}
//           </li>
//         ))}
//         </ul>
//       </div>
//     );
//   }
// });
//
// React.render(<App/>, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// We can refactor to get a <Gravatar> component that takes a user's email as
// a prop and automatically generates the <img src> and a size prop

// import MD5 from 'MD5';
//
// var GRAVATAR_URL = 'http://gravatar.com/avatar';
// var USERS = [
//   { name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
//   { name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
// ];
//
// var Gravatar = React.createClass({
//   propTypes: {
//     email: React.PropTypes.string.isRequired,
//     size: React.PropTypes.number.isRequired
//   },
//   getDefaultProps() {
//     return {
//       size: 80 // this.props.size defaults to 80
//     };
//   },
//   render() {
//     return (
//       <img src={GRAVATAR_URL + '/' + MD5(this.props.email) + '?s=' + this.props.size}/>
//     );
//   }
// });
//
// var App = React.createClass({
//   render () {
//     return (
//       <div>
//         <h1>Users</h1>
//         <ul>
//         {USERS.map(user => (
//           <li key={user.email}>
//             <Gravatar email={user.email}/> {user.name}
//           </li>
//         ))}
//         </ul>
//       </div>
//     );
//   }
// });
//
// React.render(<App/>, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// We can have better validation with a custom prop

// import MD5 from 'MD5';
//
// var GRAVATAR_URL = 'http://gravatar.com/avatar';
// var USERS = [
//   { name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
//   { name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
// ];
//
// function isEmail(value) {
//   return typeof value === 'string' && (/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4}/).test(value);
// }
//
// var Gravatar = React.createClass({
//   propTypes: {
//     email: function (props, propName, componentName) {
//       var value = props[propName];
//
//       if (value !== undefined && !isEmail(value))
//         return new Error(`Invalid prop "${propName}" given to "${componentName}", "${value}" does not look like an email address"`);
//     },
//     size: React.PropTypes.number.isRequired
//   },
//   getDefaultProps() {
//     return {
//       size: 80
//     };
//   },
//   render() {
//     return (
//       <img src={GRAVATAR_URL + '/' + MD5(this.props.email) + '?s=' + this.props.size}/>
//     );
//   }
// });
//
// var App = React.createClass({
//   render () {
//     return (
//       <div>
//         <h1>Users</h1>
//         <ul>
//         {USERS.map(user => (
//           <li key={user.email}>
//             <Gravatar email={user.email}/> {user.name}
//           </li>
//         ))}
//         </ul>
//       </div>
//     );
//   }
// });
//
// React.render(<App/>, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// Eventually you'll probably end up creating a bunch of custom prop types for
// common types of objects you pass around in your app

function isEmail(value) {
  var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|”(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*”)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return typeof value === 'string' && regex.test(value);
}

var PropTypes = {

  email: function (props, propName, componentName, location, isRequired) {
    var value = props[propName];

    if (isRequired && value === undefined)
      return new Error(`Required prop "${propName}" was not specified in "${componentName}".`);

    if (value !== undefined && !isEmail(value))
      return new Error(`Invalid prop "${propName}" given to "${componentName}", "${value}" does not look like an email address"`);
  }

};

PropTypes.email.isRequired = function (...args) {
  return PropTypes.email.apply(PropTypes.email, args.concat([ true ]));
};

import MD5 from 'MD5';

var GRAVATAR_URL = 'http://gravatar.com/avatar';
var USERS = [
  { name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
  { name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
];

var Gravatar = React.createClass({
  propTypes: {
    email: PropTypes.email.isRequired,
    size: React.PropTypes.number.isRequired
  },
  getDefaultProps() {
    return {
      size: 80
    };
  },
  render() {
    return (
      <img src={GRAVATAR_URL + '/' + MD5(this.props.email) + '?s=' + this.props.size}/>
    );
  }
});

var App = React.createClass({
  render () {
    return (
      <div>
        <h1>Users</h1>
        <ul>
        {USERS.map(user => (
          <li key={user.email}>
            <Gravatar email={user.email}/> {user.name}
          </li>
        ))}
        </ul>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('app'));
