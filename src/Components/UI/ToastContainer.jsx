import React from 'react'
import { AnimatePresence } from 'framer-motion'
import HelperToast from '../Utils/HelperToast'

const ToastContainer = ({ toasts }) => {
  return (
    <div className='custom-transparent position-fixed top-0 end-0 p-3' style={{ zIndex: 9999, marginTop: "10px" }}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <HelperToast
            key={toast.id}
            {...toast}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer