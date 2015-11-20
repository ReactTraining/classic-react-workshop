var React = require('react');
var $ = require('jquery');
require('bootstrap-webpack');

////////////////////////////////////////////////////////////////////////////////
// Bootstrap makes our job pretty easy
//var App = React.createClass({
  //render () {
    //return (
      //<div className="container">
        //<h1>Integrating with Bootstrap</h1>
        //<button className="btn btn-primary" data-toggle="modal" data-target="#myModal">open modal</button>
        //<div id="myModal" className="modal fade">
          //<div className="modal-dialog">
            //<div className="modal-content">
              //<div className="modal-header">
                //<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                //<h4 className="modal-title">Modal title</h4>
              //</div>
              //<div className="modal-body">
                //<p>One fine body&hellip;</p>
              //</div>
              //<div className="modal-footer">
                //<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                //<button type="button" className="btn btn-primary">Save changes</button>
              //</div>
            //</div>
          //</div>
        //</div>
      //</div>
    //);
  //}
//});

//React.render(<App />, document.getElementById('app'));


////////////////////////////////////////////////////////////////////////////////
// But we'd like a more React-like API to manage its state.

//var Modal = React.createClass({
  //componentDidMount () {
    //this.showOrHide();
    //$(this.getDOMNode()).on('hidden.bs.modal', () => {
      //if (this.props.onClose)
        //this.props.onClose();
    //});
  //},

  //componentDidUpdate () {
    //this.showOrHide();
  //},

  //showOrHide () {
    //if (this.props.isOpen)
      //this.open();
    //else
      //this.hide();
  //},

  //open () {
    //$(this.getDOMNode()).modal('show');
  //},

  //hide () {
    //$(this.getDOMNode()).modal('hide');
  //},

  //render () {
    //return (
      //<div className="modal fade">
        //<div className="modal-dialog">
          //<div className="modal-content">
            //<div className="modal-header">
              //<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              //<h4 className="modal-title">{this.props.title}</h4>
            //</div>
            //<div className="modal-body">
              //{this.props.children}
            //</div>
            //<div className="modal-footer">
              //{this.props.buttons}
            //</div>
          //</div>
        //</div>
      //</div>
    //);
  //}
//});

//var App = React.createClass({
  //getInitialState () {
    //return {
      //modalIsOpen: false
    //};
  //},

  //openModal () {
    //this.setState({
      //modalIsOpen: !this.state.modalIsOpen
    //});
  //},

  //handleModalClose () {
    //this.setState({
      //modalIsOpen: false
    //});
  //},

  //render () {
    //return (
      //<div className="container">
        //<h1>Integrating with Bootstrap</h1>
        //<button className="btn btn-primary" onClick={this.openModal}>open modal</button>
        //<Modal
          //isOpen={this.state.modalIsOpen}
          //onClose={this.handleModalClose}
          //title="One fine modal"
          //buttons={[
            //<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>,
            //<button type="button" className="btn btn-primary">Save changes</button>
          //]}
        //>
          //<p>I am a modal</p>
        //</Modal>
      //</div>
    //);
  //}
//});

//React.render(<App />, document.getElementById('app'));

////////////////////////////////////////////////////////////////////////////////
// And make it even nicer

var Modal = React.createClass({
  componentDidMount () {
    this.showOrHide();
    $(this.getDOMNode()).on('hidden.bs.modal', () => {
      if (this.props.onClose)
        this.props.onClose();
    });
  },

  componentDidUpdate () {
    this.showOrHide();
  },

  showOrHide () {
    if (this.props.isOpen)
      this.open();
    else
      this.hide();
  },

  open () {
    $(this.getDOMNode()).modal('show');
  },

  hide () {
    $(this.getDOMNode()).modal('hide');
  },

  render () {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

var ModalFooter = React.createClass({
  render () {
    return (
      <div className="modal-footer">
        {this.props.children}
      </div>
    );
  }
});

var ModalBody = React.createClass({
  render () {
    return (
      <div className="modal-body">
        {this.props.children}
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState () {
    return {
      modalIsOpen: false
    };
  },

  openModal () {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  },

  handleModalClose () {
    this.setState({
      modalIsOpen: false
    });
  },

  render () {
    return (
      <div className="container">
        <h1>Integrating with Bootstrap</h1>
        <button className="btn btn-primary" onClick={this.openModal}>open modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onClose={this.handleModalClose}
          title="One fine modal"
        >
          <ModalBody>
            <p>I am a modal</p>
          </ModalBody>

          <ModalFooter>
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>,
            <button type="button" className="btn btn-primary">Save changes</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));

