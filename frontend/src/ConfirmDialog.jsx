import React from 'react';
import './ConfirmDialog.css';

function ConfirmDialog({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel, loading }) {
  return (
    <div className="confirm-dialog-backdrop">
      <div className="confirm-dialog">
        <h2 className="confirm-dialog-title">{title}</h2>
        <p className="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog-actions">
          <button className="confirm-dialog-cancel" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </button>
          <button className="confirm-dialog-confirm" onClick={onConfirm} disabled={loading}>
            {loading ? 'Logging out...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
