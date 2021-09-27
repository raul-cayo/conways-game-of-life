import React from 'react';
import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalID = this.props.id || ( 'modal-' + Math.floor(Math.random() * 100000) );
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const modal = document.getElementById(this.modalID);
    modal.style.display = 'none';
  }

  render() {
    return (
      <div id={this.modalID} className="modal-background" onClick={this.closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-head">
            <h2>{this.props.title}</h2>
            <span className="material-icons" onClick={this.closeModal}>close</span>
          </div>
          <div className="modal-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
