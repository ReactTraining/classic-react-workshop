////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// This Modal, even though its a React component, has an imperative API to
// open and close it. Can you convert it to a declarative API?
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import 'bootstrap-webpack'

class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func
  }

  componentDidMount() {
    this.doImperativeWork()

    // This is only necessary to sync the state back up to
    // the parent when the user clicks on the overlay.
    $(this.node).on('hidden.bs.modal', () => {
      if (this.props.onClose)
        this.props.onClose()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen)
      this.doImperativeWork()
  }

  doImperativeWork() {
    if (this.props.isOpen) {
      this.open()
    } else {
      this.close()
    }
  }

  open() {
    $(this.node).modal('show')
  }

  close() {
    $(this.node).modal('hide')
  }

  render() {
    return (
      <div className="modal fade" ref={node => this.node = node}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    isModalOpen: false
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <div className="container">
        <h1>Let’s make bootstrap modal declarative</h1>

        <button
          className="btn btn-primary"
          onClick={this.openModal}
        >open modal</button>

        <Modal
          title="Declarative is better"
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal}
        >
          <p>Calling methods on instances is a FLOW not a STOCK!</p>
          <p>It’s the dynamic process, not the static program in text space.</p>
          <p>You have to experience it over time, rather than in snapshots of state.</p>
          <button
            onClick={this.closeModal}
            type="button"
            className="btn btn-default"
          >Close</button>
        </Modal>

      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
