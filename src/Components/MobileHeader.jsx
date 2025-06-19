import { useState } from 'react'

const MobileHeader = () => {
  const [ clicked, setClicked ] = useState(false);

  const handleClick = () =>{
    setClicked(true);
    setTimeout(() => setClicked(false), 3000)
  }
  return (
    <div className='mobile-header p-2 d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center gap-1 mx-2'>
            <div className='rounded-circle bg-white' style={{width:'45px', height:'45px'}}>
            </div>
            <div className='px-2'>
                <p className='fw-semibold fs-5'>Murali Dharan</p>            
                <p className=''>Front-End Developer</p>
            </div>            
        </div>
        <div className=''>
          <a href='/Resume.pdf' download='Murali-Dharan-Resume.pdf' className='text-decoration-none fw-semibold resume-btn' onClick={handleClick}>
            {clicked ? <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="none" stroke-dasharray="14" stroke-dashoffset="14" d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="14;0"/></path><path fill="currentColor" d="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"><animate attributeName="d" calcMode="linear" dur="1.5s" keyTimes="0;0.7;1" repeatCount="indefinite" values="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5;M12 4 h2 v3 h2.5 L12 11.5M12 4 h-2 v3 h-2.5 L12 11.5;M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"/></path></g></svg> : 
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"><g fill="none"><path fill="currentColor" d="M6.5 12.5a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7Zm0 2.5a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7Z"/><path fill="currentColor" fill-rule="evenodd" d="M11.185 1H4.5A1.5 1.5 0 0 0 3 2.5v15A1.5 1.5 0 0 0 4.5 19h11a1.5 1.5 0 0 0 1.5-1.5V7.202a1.5 1.5 0 0 0-.395-1.014l-4.314-4.702A1.5 1.5 0 0 0 11.185 1ZM4 2.5a.5.5 0 0 1 .5-.5h6.685a.5.5 0 0 1 .369.162l4.314 4.702a.5.5 0 0 1 .132.338V17.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-15Z" clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.5 2.1v4.7h4.7"/><path fill="currentColor" d="M8.134 6.133a1.067 1.067 0 1 0 0-2.133a1.067 1.067 0 0 0 0 2.133Z"/><path fill="currentColor" fill-rule="evenodd" d="M10.266 8.444c0-1.134-.955-1.955-2.133-1.955S6 7.309 6 8.444v.534a.356.356 0 0 0 .356.355h3.555a.356.356 0 0 0 .355-.355v-.534Z" clip-rule="evenodd"/></g></svg>}            
          </a> 
        </div>
    </div>
  )
}

export default MobileHeader