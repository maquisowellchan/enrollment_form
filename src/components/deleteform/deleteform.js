import React from 'react';

function StudentDeleteConfirmation({ student, onCancel, onConfirm }) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>Are you sure you want to delete {student.name}?</h2>
        <div className="modal-buttons">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn-primary" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDeleteConfirmation;
