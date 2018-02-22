////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - rename this file to exercise.js or copy paste it there to get it to run
// - even though this Modal is a React component, the author created an
//   imperative API D: Make it declarative!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";

class Modal extends React.Component {
  state = { isOpen: false };

  containerStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.75)"
  };

  contentStyle = {
    position: "fixed",
    padding: 10,
    left: 50,
    right: 50,
    top: 50,
    bottom: 50,
    background: "#fff",
    border: "1px solid",
    textAlign: "center"
  };

  open() {
    this.setState({ isOpen: true });
  }

  close() {
    this.setState({ isOpen: false });
  }

  render() {
    if (this.state.isOpen === false) return null;

    return (
      <div style={this.containerStyle}>
        <div style={this.contentStyle}>{this.props.children}</div>
      </div>
    );
  }
}

class App extends React.Component {
  openModal = () => {
    this.refs.modal.open();
  };

  closeModal = () => {
    this.refs.modal.close();
  };

  render() {
    return (
      <div>
        <h1>Unbreakable</h1>
        <button onClick={this.openModal}>remove from favorites</button>
        <br />
        <br />

        <img src="http://filmmakeriq.com/wp-content/uploads/2015/05/Unbreakable.jpg" />
        <p>
          Your bones don’t break, mine do. That’s clear. Your cells
          react to bacteria and viruses differently than mine. You don’t
          get sick, I do. That’s also clear. But for some reason, you
          and I react the exact same way to water. We swallow it too
          fast, we choke. We get some in our lungs, we drown. However
          unreal it may seem, we are connected, you and I. We’re on the
          same curve, just on opposite ends.
        </p>

        <Modal ref="modal">
          <button onClick={this.closeModal}>close</button>
          <p>Are you sure?</p>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
