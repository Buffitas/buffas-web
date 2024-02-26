// Modal.js
import React from 'react';
import './css/Modal.css'

function Modal({ isOpen, onClose, children }) {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
        {children}
    </div>
  );
}

export default Modal;
 