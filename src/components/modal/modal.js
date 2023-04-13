import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'


function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <FontAwesomeIcon className="close" style={{width: 35, height:35}} icon={faClose} onClick={props.pagclick}/>
        <p>This is some modal content.</p>
      </div>
    </div>
  );
}

export default Modal;