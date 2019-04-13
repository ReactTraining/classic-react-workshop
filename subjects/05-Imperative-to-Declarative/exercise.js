////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - This Modal, even though its a React component, has an imperative API
//   to open and close it. Can you convert it to a declarative API?
//
// Got extra time?
//
// - What happens when you click the overlay? How can you keep the state of
//   the <App> consistent with what you see in the page?
////////////////////////////////////////////////////////////////////////////////
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function Modal({ children, title }, ref) {
  return (
    <div className="modal fade" ref={ref}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

Modal = React.forwardRef(Modal);

function App() {
  const modalRef = useRef();

  function openModal() {
    $(modalRef.current).modal("show");
  }

  function closeModal() {
    $(modalRef.current).modal("hide");
  }

  return (
    <div className="container">
      <h1>Let’s make bootstrap modal declarative</h1>

      <button className="btn btn-primary" onClick={openModal}>
        open modal
      </button>

      <Modal title="Declarative is better" ref={modalRef}>
        <p>Calling methods on instances is a FLOW not a STOCK!</p>
        <p>
          It’s the dynamic process, not the static program in text
          space.
        </p>
        <p>
          You have to experience it over time, rather than in snapshots
          of state.
        </p>
        <button
          onClick={closeModal}
          type="button"
          className="btn btn-default"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
