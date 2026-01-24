import React from 'react'
import { Link, useLocation } from 'react-router-dom'


const MobileNav = () => {
  const location = useLocation();
  const current = location.pathname.split('/')[1];
  const tab = current === "" ? "explore" : current;
  
  return (
    <div>
      <div className='d-flex justify-content-center align-items-center gap-3 mobile-nav ' >
        <Link to='/explore' className={`${tab === 'explore' ? 'mobile-active' : ''} d-flex flex-column gap-1 justify-content-center align-items-center`} onClick={window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={tab === 'explore' || tab === '' ? 'icon' : ''} viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 17.5L14 14l3.5-7.5L10 10l-3.5 7.5ZM12 13q-.425 0-.713-.288T11 12q0-.425.288-.713T12 11q.425 0 .713.288T13 12q0 .425-.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z" /></svg>
          Explore
        </Link>
        <Link to='/skills' className={`${tab === 'skills' ? 'mobile-active' : ''} d-flex flex-column gap-1 justify-content-center align-items-center`} onClick={window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={tab === 'skills' ? 'icon' : ''} viewBox="0 0 32 32"><path fill="currentColor" d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8z" /></svg>
          Skills
        </Link>
        <Link to='/projects' className={`${tab === 'projects' ? 'mobile-active' : ''} d-flex flex-column gap-1 justify-content-center align-items-center`} onClick={window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={tab === 'projects' ? 'icon' : ''} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3" /></g></svg>
          Projects
        </Link>
        <Link to='/about' className={`${tab === 'about' ? 'mobile-active' : ''} d-flex flex-column gap-1 justify-content-center align-items-center`} onClick={window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={tab === 'about' ? 'icon' : ''} viewBox="0 0 1280 1536"><path fill="currentColor" d="M1280 1271q0 109-62.5 187t-150.5 78H213q-88 0-150.5-78T0 1271q0-85 8.5-160.5t31.5-152t58.5-131t94-89T327 704q131 128 313 128t313-128q76 0 134.5 34.5t94 89t58.5 131t31.5 152t8.5 160.5zm-256-887q0 159-112.5 271.5T640 768T368.5 655.5T256 384t112.5-271.5T640 0t271.5 112.5T1024 384z" /></svg>
          About
        </Link>
        <Link to='/contact' className={`${tab === 'contact' ? 'mobile-active' : ''} d-flex flex-column gap-1 justify-content-center align-items-center `} onClick={window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={tab === 'contact' ? 'icon' : ''} viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.134 2.995L2.217 11.5a1 1 0 0 0 .866 1.5h9.834a1 1 0 0 0 .866-1.5L8.866 2.995a1 1 0 0 0-1.732 0m3.03-.751c-.962-1.665-3.366-1.665-4.329 0L.918 10.749c-.963 1.666.24 3.751 2.165 3.751h9.834c1.925 0 3.128-2.085 2.164-3.751z" clip-rule="evenodd" /></svg>
          Contact
        </Link>
      </div>
    </div>
  )
}

export default MobileNav