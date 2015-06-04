import React from 'react/addons';
import tweenState from 'react-tween-state';
import assign from 'object-assign';

var TweenState = tweenState.Mixin;
var { TransitionGroup } = React.addons;
var guid = -1;

function getHeight(node) {
  return node.scrollHeight;
}

var HeightFader = React.createClass({

  mixins: [ TweenState ],

  getDefaultProps () {
    return {
      component: 'li'
    };
  },

  getInitialState () {
    return {
      opacity: 0,
      height: 0
    };
  },

  componentWillEnter (cb) {
    this.tweenState('opacity', {
      duration: 250,
      endValue: 1
    });

    this.tweenState('height', {
      duration: 250,
      endValue: getHeight(React.findDOMNode(this)),
      onEnd: cb
    });
  },

  componentWillLeave (cb) {
    this.tweenState('opacity', {
      duration: 250,
      endValue: 0
    });

    this.tweenState('height', {
      duration: 250,
      endValue: 0,
      onEnd: cb
    });
  },

  render () {
    var opacity = this.getTweeningValue('opacity');
    var height = this.getTweeningValue('height');
    return React.createElement(this.props.component, assign({}, this.props, {
      style: {opacity, height}
    }));
  }

});

var List = React.createClass({
  getInitialState () {
    return {
      items: []
    };
  },

  addItem (e) {
    if (e.key === 'Enter') {
      this.state.items.unshift({
        id: ++guid,
        label: e.target.value
      });
      this.setState({ items: this.state.items });
      e.target.value = '';
    }
  },

  removeItem (item) {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  },

  render () {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <input onKeyPress={this.addItem}/>
        <TransitionGroup component="ul">
          {this.state.items.map(item => (
            <HeightFader key={item.id}>
              {item.label}{' '}
              <button onClick={this.removeItem.bind(this, item)}>×</button>
            </HeightFader>
          ))}
        </TransitionGroup>
      </div>
    );
  }
});

/*
        <TransitionGroup component="ul">
          {this.state.items.map(item => (
            <HeightFader key={item.id}>
              {item.label}{' '}
              <button onClick={this.removeItem.bind(this, item)}>×</button>
            </HeightFader>
          ))}
        </TransitionGroup>
        */
var App = React.createClass({
  render () {
    return (
      <div>
        <List name="Transition Group"/>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('app'));

