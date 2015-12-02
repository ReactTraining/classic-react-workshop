var React = require('react/addons');
var { TransitionGroup } = React.addons;
var HeightFader = require('./components/HeightFader');

var List = React.createClass({

  getInitialState() {
    return {
      items: []
    };
  },

  addItem(e) {
    if (e.key === 'Enter') {
      if (this.guid == null)
        this.guid = 1;

      var newItem = {
        id: this.guid++,
        label: e.target.value
      };

      this.setState({
        items: [ newItem ].concat(this.state.items)
      });

      e.target.value = '';
    }
  },

  removeItem(item) {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  },

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <input onKeyPress={this.addItem} />
        <ul>
          {this.state.items.map(item => (
            <li key={item.id}>
              {item.label} <button onClick={() => this.removeItem(item)}>remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

});

var App = React.createClass({

  render() {
    return (
      <div>
        <List name="Transition Group" />
      </div>
    );
  }

});

React.render(<App />, document.getElementById('app'));
