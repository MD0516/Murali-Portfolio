import React from 'react'
import { useStateContext } from '../../Context/StateContext'
import { Link, useNavigate } from 'react-router-dom'

const RegisterButton = () => {
    const { isMobile } = useStateContext()
    const navigate = useNavigate()

    const navigateToLogin = (type) => {
        navigate(`/auth?type=${type}`)
    }

    return isMobile ? null : (
        <div className='register-btn text-white'>
            <motion.button onClick={() => navigateToLogin("admin")} whileHover={{ y: -3 }} whileTap={{ scale: .95 }} transition={{ duration: .01}} className='rounded px-3 py-1 fw-bold'>Login</motion.button>
        </div>
    )
}

export default RegisterButton