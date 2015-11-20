var React = require('react/addons');
var { Perf } = React.addons;
var guid = 0;

var ITEMS = [];
for (var i = 0; i < 2000; i++)
  ITEMS.push({ id: ++guid, body: `item ${guid}` });

var TodoItem = React.createClass({

  render () {
    return (
      <li>
        <span><input type="checkbox" /> </span>
        <span>
          <span><b>item:</b> </span>
          <span className="stuff" />
          <span className="stuff" />
          <span className="stuff" />
          <span className="stuff" />
          <span className="stuff" />
          <span className="stuff" />
          <span className="stuff" />
          <span className="stuff" />
          <span className="stuff" />
        </span>
        <span tabIndex="-1">
          <span className="thing">
            <span style={{color: 'blue'}}>{this.props.body}</span>
          </span>
        </span>
      </li>
    );
  }
});

var TodoList = React.createClass({
  getInitialState () {
    return {
      items: ITEMS
    };
  },

  handleSubmit (e) {
    e.preventDefault();
    var item = {
      id: ++guid,
      body: e.target.elements[0].value
    };
    e.target.reset();

    Perf.start();
    this.setState({
      items: [item].concat(this.state.items)
    }, () => {
      Perf.stop();
      Perf.printWasted();
    });
  },

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="input" />
        </form>
        <ul>
          {this.state.items.map(item => (
            <TodoItem key={item.id} body={item.body} />
          ))}
        </ul>
      </div>
    );
  }
});

var App = React.createClass({
  render () {
    return (
      <div>
        <TodoList />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));

