import React from 'react'

const DesktopAlert = ({ isMobile, atLoad, setAtLoad }) => {
  if (!atLoad || isMobile) return null;

  return (
    <div className='custom-modal-overlay' onClick={() => setAtLoad(false)}>
      <div className='custom-alert-content' onClick={(e) => e.stopPropagation()}>
        <div className="custom-alert-header">
          <button
            type="button"
            className="custom-close-btn"
            onClick={() => setAtLoad(false)}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 16 16" fill="currentColor"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="8" r="6.25" /><path d="M8 5.25v0m0 6v-3.5" /></g></svg>
          </div>
          <h5 className='custom-alert-title'>Switch to desktop for better experience.</h5>
        </div>
      </div>
    </div>
  )
}

export default DesktopAlert