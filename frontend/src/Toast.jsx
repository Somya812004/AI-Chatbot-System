import React, { useEffect } from 'react';
import './Toast.css';

function Toast({ message, onClose }) {
  // Auto close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>✖</button>
    </div>
  );
}

export default Toast;
