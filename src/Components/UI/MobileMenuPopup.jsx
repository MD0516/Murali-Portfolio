import React from 'react'
import { motion } from 'framer-motion'
import { socialLinks } from '../../Constants/socialLinks.jsx'

const MobileMenuPopup = ({ clicked, setClicked }) => {
  if (!clicked) return null;

  return (
    <>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.1, ease: 'linear' }} className='custom-blur' onClick={() => setClicked(false)} ></motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.1, ease: 'linear' }} className='mobile-menu-popup'>
        <div className='mobile-menu-close' onClick={() => setClicked(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#858585" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" /></svg>
        </div>
        <div className=' d-flex flex-column gap-3 p-4 mt-5 mobile-links'>
          {
            socialLinks.map((item, index) => (
              <a key={index} href={item.link} target='_blank' rel="noopener noreferrer" style={{ color: '#858585' }} className='text-decoration-none'>
                {item.icon} <span>{item.title}</span>
              </a>
            ))
          }
        </div>
      </motion.div>
    </>
  )
}

export default MobileMenuPopup