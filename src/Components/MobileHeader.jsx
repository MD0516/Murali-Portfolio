import React from 'react'

const MobileHeader = () => {
  return (
    <div className='mobile-header p-2'>
        <div className='d-flex align-items-center gap-1 mx-2'>
            <div className='rounded-circle bg-white' style={{width:'45px', height:'45px'}}>
            </div>
            <div className='px-2'>
                <p className='fw-semibold fs-5'>Murali Dharan</p>            
                <p className=''>Front-End Developer</p>
            </div>            
        </div>
    </div>
  )
}

export default MobileHeader