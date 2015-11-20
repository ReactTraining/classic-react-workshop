var React = require('react');

var Modal = React.createClass({
  componentDidMount () {
    this.portalNode = document.createElement('div');
    document.body.appendChild(this.portalNode);
    this.renderPortal();
  },

  componentDidUpdate () {
    this.renderPortal();
  },

  renderPortal () {
    React.render(<ModalPortal {...this.props} context={this.context} />, this.portalNode);
  },

  render () {
    return null;
  }
});

var ModalPortal = React.createClass({
  containerStyle: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.75)'
  },

  contentStyle: {
    position: 'fixed',
    left: 50,
    right: 50,
    top: 50,
    bottom: 50,
    background: '#fff',
    border: '1px solid',
    textAlign: 'center'
  },

  sendCloseRequest () {
    this.props.onCloseRequest();
  },

  handleKeyUp (event) {
    if (event.key === 'Escape')
      this.props.onCloseRequest();
  },

  focus () {
    React.findDOMNode(this.refs.content).focus();
  },

  componentDidUpdate (prevProps) {
    var justOpened = prevProps.isOpen === false && this.props.isOpen === true;
    if (justOpened)
      this.focus();
  },

  renderDecoratedChildren () {
    return React.Children.map(this.props.children, (child) => {
      if (child.type === ModalCloseButton) {
        return React.cloneElement(child, {
          onClick: this.sendCloseRequest
        });
      }
      else {
        return child;
      }
    });
  },

  render () {
    if (this.props.isOpen === false)
      return null;

    return (
      <div
        style={this.containerStyle}
        onClick={this.sendCloseRequest}
        onKeyUp={this.handleKeyUp}
      >
        <div
          ref="content"
          tabIndex="-1"
          style={this.contentStyle}
          onClick={(e) => e.stopPropagation()}
        >
          {this.renderDecoratedChildren()}
        </div>
      </div>
    );
  }
});

var ModalCloseButton = React.createClass({
  render () {
    return <button {...this.props} />;
  }
});

var App = React.createClass({
  getInitialState () {
    return {
      confirmingRemove: false
    };
  },

  openTheModal () {
    this.setState({
      confirmingRemove: true
    });
  },

  handleModalClose () {
    this.setState({
      confirmingRemove: false
    });
  },

  render () {
    return (
      <div>
        <h1>Unbreakable</h1>
        <button onClick={this.openTheModal}>remove from favorites</button><br /><br />

        <Modal isOpen={this.state.confirmingRemove} onCloseRequest={this.handleModalClose} >
          <ModalCloseButton>close</ModalCloseButton>
          <p>Are you sure?</p>
        </Modal>

        <img src="http://filmmakeriq.com/wp-content/uploads/2015/05/Unbreakable.jpg" />
        <p>
          Your bones don’t break, mine do. That’s clear. Your cells react to
          bacteria and viruses differently than mine. You don’t get sick, I do.
          That’s also clear. But for some reason, you and I react the exact
          same way to water. We swallow it too fast, we choke. We get some in
          our lungs, we drown. However unreal it may seem, we are connected,
          you and I. We’re on the same curve, just on opposite ends.
        </p>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
