import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import dp from '/Image/DP.webp?url'

const Sidebar = () => {
  const location = useLocation();
  const current = location.pathname.split('/')[1] ;

  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleSidebar = () => {
    setToggleSidebar(prev => !prev)
  }

  return (
    <>
      <motion.div key='sidebar-text' initial={{width: '280'}} animate={{ width : toggleSidebar ? 70 : 280}} exit={{width: 70}} transition={{duration: .5, ease: 'easeInOut'}} className={`d-flex flex-column gap-3 align-items-center p-4 position-fixed sidebar `} style={{zIndex: 998}}  >
        
        <AnimatePresence> <motion.div initial= {{scale: 0.8, opacity: 0}} animate={{width: toggleSidebar ? 40 : 200, height: toggleSidebar ? 40 : 200, scale: 1, opacity: 1}} exit= {{scale: 0.8, opacity: 0}} transition={{ duration: 0.5, ease: 'easeInOut' }} className='rounded-circle bg-white d-flex justify-content-center align-items-center dp' >
            <motion.img animate={{left: !toggleSidebar ? '23px' : ''}} transition={{ duration: .8, ease: 'easeInOut'}} src={dp} alt="profile-pic" loading='lazy'  />
          </motion.div> </AnimatePresence>
        <AnimatePresence>
          { !toggleSidebar && (
            <motion.div initial={{ opacity: 0, visibility: 'none', scale: 0 }} animate={{ opacity: 1,visibility: 'visible' ,scale: 1 }} exit={{ opacity: 0,  visibility: 'none', scale: 0 }} transition={{ duration: 0.5 }} key='sidebar-text'  className='text-white text-center'>
              <h2>Murali Dharan</h2>
              <h4>Front-End Developer</h4>
            </motion.div>)
          }
        </AnimatePresence>

        <AnimatePresence >
          { !toggleSidebar &&(
            <motion.div key={toggleSidebar ? 'collapsed' : 'expanded'} initial={{ opacity:0,visibility: 'none' , scale: 0 }} animate={{ opacity: 1, visibility: 'visible', scale: 1 }} exit={{ opacity: 0,visibility: 'none', scale: 0 }} transition={{ duration: 0.2 }} className='d-flex align-items-center gap-3 custom-hover'>
              <a href="https://github.com/MD0516" target='_blank' rel="noopener noreferrer" style={{color: '#858585'}}>
                <i className='bi bi-github fs-4 '></i>
              </a>
              <a href="https://www.linkedin.com/in/murali-dharan-30163a248/" target='_blank' rel="noopener noreferrer" style={{color: '#858585'}}>
                <i className='bi bi-linkedin fs-4'></i>
              </a>
              <a href="https://www.instagram.com/hatetosocializ.e/" target='_blank' rel="noopener noreferrer" style={{color: '#858585'}}>
                <i className='bi bi-instagram fs-4'></i>
              </a>
              <a href="https://wa.me/919941161100?text=Hi%20Murali%2C%20I%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20your%20work.%20Can%20we%20talk%3F" target='_blank' rel="noopener noreferrer" style={{color: '#858585'}}>
                <i className='bi bi-whatsapp fs-4'></i>
              </a>
              <a href='/Resume.pdf' download='Murali-Dharan-Resume.pdf' target='_blank' className='text-decoration-none resume-download' style={{color: '#858585'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 10.502l.104-.104c.116-.076.216-.176.292-.292l1.854-1.854a.625.625 0 0 0-.442-1.067h-1.25V4a1 1 0 0 0-2 0v3.625h-1.25a.625.625 0 0 0-.442 1.067l1.854 1.854c.076.116.176.216.292.292l.104.104a.625.625 0 0 0 .884 0" clip-rule="evenodd"/></svg>
              </a> 
            </motion.div>)
          }
        </AnimatePresence>
        <motion.div initial={{ opacity: 0, visibility: 'none', x: -200 }} animate={{ opacity: 1,visibility: 'visible' , x: 0 }} exit={{ opacity: 0,  visibility: 'none', x: -200  }} transition={{ duration: 0.8, ease: 'easeInOut' }}className='d-flex flex-column gap-3 nav' >
          <Link to='/explore' className={`${current === 'explore' || current === '' ? 'active' : ''} d-flex gap-2 justify-content-start`} onClick={window.scrollTo({ top:0, behavior: 'smooth' })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={current === 'explore' || current === '' ? 'icon' : ''} viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 17.5L14 14l3.5-7.5L10 10l-3.5 7.5ZM12 13q-.425 0-.713-.288T11 12q0-.425.288-.713T12 11q.425 0 .713.288T13 12q0 .425-.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>
            <>{!toggleSidebar && (<motion.span layout key='Explore' initial={{ opacity: 0, visibility: 'none', x: -200 }} animate={{ opacity: 1,visibility: 'visible' , x: 0 }} exit={{ opacity: 0,  visibility: 'none', x: -200  }} transition={{ duration: 0.2, ease: 'easeInOut' }}>Explore</motion.span>) }</>
          </Link>
          <Link to='/skills' className={`${current === 'skills' ? 'active' : ''} d-flex gap-2 justify-content-start `} onClick={window.scrollTo({ top:0, behavior: 'smooth' })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={current === 'skills' ? 'icon' : ''} viewBox="0 0 32 32"><path fill="currentColor" d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8z"/></svg>
            <>{!toggleSidebar && (<motion.span layout key='Skills' initial={{ opacity: 0, visibility: 'none', x: -200 }} animate={{ opacity: 1,visibility: 'visible' , x: 0 }} exit={{ opacity: 0,  visibility: 'none', x: -200  }} transition={{ duration: 0.3, ease: 'easeInOut' }}>Skills</motion.span>)}</>
            
          </Link>
          <Link to='/projects' className={`${current === 'projects' ? 'active' : ''} d-flex gap-2 justify-content-start`} onClick={window.scrollTo({ top:0, behavior: 'smooth' })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={current === 'projects' ? 'icon' : ''} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3"/></g></svg>
            <>{!toggleSidebar && (<motion.span layout key='Projects' initial={{ opacity: 0, visibility: 'none', x: -200 }} animate={{ opacity: 1,visibility: 'visible' , x: 0 }} exit={{ opacity: 0,  visibility: 'none', x: -200  }} transition={{ duration: 0.4, ease: 'easeInOut' }}>Projects</motion.span>)}</>
            
          </Link>
          <Link to='/about' className={`${current === 'about' ? 'active' : ''} d-flex gap-2 justify-content-start `} onClick={window.scrollTo({ top:0, behavior: 'smooth' })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={current === 'about' ? 'icon' : ''} viewBox="0 0 1280 1536"><path fill="currentColor" d="M1280 1271q0 109-62.5 187t-150.5 78H213q-88 0-150.5-78T0 1271q0-85 8.5-160.5t31.5-152t58.5-131t94-89T327 704q131 128 313 128t313-128q76 0 134.5 34.5t94 89t58.5 131t31.5 152t8.5 160.5zm-256-887q0 159-112.5 271.5T640 768T368.5 655.5T256 384t112.5-271.5T640 0t271.5 112.5T1024 384z"/></svg>
            <>{!toggleSidebar && (<motion.span layout key='About' initial={{ opacity: 0, visibility: 'none', x: -200 }} animate={{ opacity: 1,visibility: 'visible' , x: 0 }} exit={{ opacity: 0,  visibility: 'none', x: -200  }} transition={{ duration: 0.5, ease: 'easeInOut' }}>About</motion.span>)}</>
            
          </Link>
          <Link to='/contact' className={`${current === 'contact' ? 'active' : ''} d-flex gap-2 justify-content-start`} onClick={window.scrollTo({ top:0, behavior: 'smooth' })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={current === 'contact' ? 'icon' : ''} viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.134 2.995L2.217 11.5a1 1 0 0 0 .866 1.5h9.834a1 1 0 0 0 .866-1.5L8.866 2.995a1 1 0 0 0-1.732 0m3.03-.751c-.962-1.665-3.366-1.665-4.329 0L.918 10.749c-.963 1.666.24 3.751 2.165 3.751h9.834c1.925 0 3.128-2.085 2.164-3.751z" clip-rule="evenodd"/></svg>
            <>{!toggleSidebar && (<motion.span layout key='Contact' initial={{ opacity: 0, visibility: 'none', x: -200 }} animate={{ opacity: 1,visibility: 'visible' , x: 0 }} exit={{ opacity: 0,  visibility: 'none', x: -200  }} transition={{ duration: 0.6, ease: 'easeInOut' }}>Contact</motion.span>)}</>              
          </Link>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        <motion.div key= 'sidebar-toggle' initial={{left: 265}} animate={{ rotate: toggleSidebar ? 180 : 0 , left : toggleSidebar ? 60 : 265}} exit={{left: 60}} transition={{ duration: 0.5 }} className={` d-flex justify-content-center align-items-center text-white position-fixed toggle-button`} onClick={handleSidebar} style={{top: 10, zIndex: 999}}>        
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M31 36L19 24L31 12"/></svg>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Sidebar;