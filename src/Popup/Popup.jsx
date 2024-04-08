import { useState } from 'react';
import PropTypes from 'prop-types';
import './Popup.css'

function Popup ({ children, onClose, onSuccess, successTitle, title }) {
  const [isVisible, setIsVisible] = useState(true)

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => onClose(), 150);
  }

  return (
    <div className={`popup ${isVisible ? '' : 'close'}`}>
      <div className="popup-content">
        <header>
          <h1>{title}</h1>
          <button className="close" onClick={handleClose}>&times;</button>
        </header>
        <main>
          {children}
        </main>
        <button className="ok" onClick={onSuccess}> {successTitle} </button>
      </div>
    </div>
  )
}

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  successTitle: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default Popup