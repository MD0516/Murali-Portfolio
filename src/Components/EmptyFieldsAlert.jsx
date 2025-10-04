import React from 'react'

const EmptyFieldsAlert = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-alert-content" onClick={(e) => e.stopPropagation()}>
        <div className="custom-alert-header">
          <button 
            type="button" 
            className="custom-close-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className='custom-alert-body text-center'>
          <div className="custom-alert-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 16 16" fill="currentColor"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="8" r="6.25"/><path d="M8 5.25v0m0 6v-3.5"/></g></svg>
          </div>
          <h5 className='custom-alert-title'>Please fill in all the fields before submitting the form.</h5>
          <button 
            className='custom-alert-button mt-3' 
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmptyFieldsAlert