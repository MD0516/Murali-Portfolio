import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const AddProjectButton = ({ isProjectsPage, isAdmin, setAddProject }) => {
  if (!isProjectsPage || !isAdmin) return null;

  return (
    <div className='float-btn'>
      <motion.button
        whileHover={{ y: -3 }}
        whileTap={{ scale: .95 }}
        transition={{ duration: .01 }}
        className='d-flex justify-content-center align-items-center gap-2 rounded px-3 py-2 add-project-btn'
        onClick={() => setAddProject(true)}
      >
        <Plus size={20} color='#858585' className='custom-transparent' />
        Add Project
      </motion.button>
    </div>
  )
}

export default AddProjectButton