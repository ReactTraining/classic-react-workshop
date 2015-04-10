var React = require('react');
var Router = require('react-router');
var { Route, NotFoundRoute, RouteHandler, Link, Navigation, State } = Router;

var TACOS = [
  { name: 'duck confit' },
  { name: 'carne asada' },
  { name: 'shrimp' }
];

function getTacoByName(name) {
  for (var i = 0; i < TACOS.length; ++i)
    if (TACOS[i].name === name)
      return TACOS[i];

  return null;
}

var Taco = React.createClass({
  mixins: [ State ],

  propTypes: {
    onRemoveTaco: React.PropTypes.func
  },

  statics: {

    willTransitionTo: function (transition, params, query) {
      var taco = getTacoByName(params.name);
      
      if (taco == null)
        transition.redirect('home');
    }

  },

  remove: function () {
    this.props.onRemoveTaco(this.getParams().name);
  },

  render: function () {
    return (
      <div className="Taco">
        <h1>{this.getParams().name}</h1>
        <button onClick={this.remove}>remove</button>
      </div>
    );
  }
});

var NotFound = React.createClass({
  mixins: [ Navigation ],

  handleClick: function () {
    this.transitionTo('home');
  },

  render: function () {
    return (
      <div>
        <h1>:( Not found!</h1>
        <button onClick={this.handleClick}>go home</button>
      </div>
    );
  }
});

var App = React.createClass({
  mixins: [ Navigation ],

  getInitialState: function () {
    return {
      tacos: TACOS
    };
  },
  handleRemoveTaco: function (name) {
    this.setState({
      tacos: this.state.tacos.filter(function (taco) {
        return taco.name !== name;
      })
    });

    this.transitionTo('home');
  },
  render: function () {
    var items = this.state.tacos.map(function (taco) {
      return <li key={taco.name}><Link to="taco" params={taco}>{taco.name}</Link></li>;
    });

    return (
      <div>
        <h1>Tacos!</h1>
        <ul>
          {items}
        </ul>
        <RouteHandler onRemoveTaco={this.handleRemoveTaco}/>
      </div>
    );
  }
});

var routes = [
  <Route name="home" path="/" handler={App}>
    <Route name="taco" path="/tacos/:name" handler={Taco}/>
  </Route>,
  <NotFoundRoute handler={NotFound}/>
];

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});



































// var App = React.createClass({
//   mixins: [ Navigation ],
//
//   getInitialState: function () {
//     return {
//       tacos: TACOS
//     };
//   },
//
//   addTaco: function () {
//     var name = prompt('taco name?');
//     this.setState({
//       tacos: this.state.tacos.concat({ name: name })
//     });
//   },
//
//   handleRemoveTaco: function (removedTaco) {
//     var tacos = this.state.tacos.filter(function (taco) {
//       return taco.name != removedTaco;
//     });
//     this.setState({ tacos: tacos });
//     this.transitionTo('/');
//   },
//
//   render: function () {
//     var links = this.state.tacos.map(function (taco, i) {
//       return (
//         <li key={i}>
//           <Link to="taco" params={taco}>{taco.name}</Link>
//         </li>
//       );
//     });
//     return (
//       <div className="App">
//         <button onClick={this.addTaco}>Add Taco</button>
//         <ul className="Master">
//           {links}
//         </ul>
//         <div className="Detail">
//           <RouteHandler onRemoveTaco={this.handleRemoveTaco}/>
//         </div>
//       </div>
//     );
//   }
// });
//
// var Taco = React.createClass({
//   mixins: [ State ],
//
//   propTypes: {
//     onRemoveTaco: React.PropTypes.func
//   },
//
//   remove: function () {
//     this.props.onRemoveTaco(this.getParams().name);
//   },
//
//   render: function () {
//     return (
//       <div className="Taco">
//         <h1>{this.getParams().name}</h1>
//         <button onClick={this.remove}>remove</button>
//       </div>
//     );
//   }
// });
//
// var routes = (
//   <Route handler={App}>
//     <Route name="taco" path="taco/:name" handler={Taco}/>
//   </Route>
// );
//
// Router.run(routes, function (Handler) {
//   React.render(<Handler/>, document.getElementById('app'));
// });
