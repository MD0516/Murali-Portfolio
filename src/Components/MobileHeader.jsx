import { useState } from 'react'
import dp from '/Image/DP.webp?url'
const MobileHeader = () => {
  return (
    <div className='mobile-header p-2 d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center gap-1 mx-2'>
            <div className='rounded-circle bg-white dp' style={{width:'45px', height:'45px'}}>
              <img src={dp} alt="profile-pic" loading='lazy' />
            </div>
            <div className='px-2'>
                <p className='fw-semibold fs-5'>Murali Dharan</p>            
                <p className=''>Full-Stack Developer</p>
            </div>            
        </div>
    </div>
  )
}

export default MobileHeader