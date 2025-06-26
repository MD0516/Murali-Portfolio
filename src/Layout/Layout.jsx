import { use, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import MobileHeader from '../Components/MobileHeader'
import MobileNav from '../Components/MobileNav'
import { motion } from 'framer-motion'

const Layout = () => {

  const location = useLocation();
  const ref = useRef(null);
  const [ isMobile, setIsMobile ] = useState(false);

  useEffect(() =>{
    ref.current?.continuousStart();
    const timer =setTimeout(() =>{
      ref.current?.complete();
    })

    return () => clearTimeout(timer);
  }, [location]);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 769px)');
    
    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleResize(); // Initial check

    mediaQuery.addEventListener('change', handleResize); // For screen size changes

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const [ atLoad, setAtLoad ] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      if (isMobile) {
        setAtLoad(true);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad(); // page already loaded
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [ isMobile]);

  useEffect(() => {
    if ( atLoad ) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    } else {
      document.body.style.overflow = 'auto'; // Allow scrolling when popup is closed
    }
  }, [atLoad]);

  const [ clicked, setClicked ] = useState(false);

  useEffect(() => {
    if ( clicked ) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    } else {
      document.body.style.overflow = 'auto'; // Allow scrolling when popup is closed
    }
  }, [clicked]);

  return (
    <>
      <LoadingBar color='#7c7b7b' ref={ref} height={2} background='transparent' shadow={false} />
      <div className='d-flex flex-column flex-md-row'>
        <div>
          {isMobile &&
           <div>
            <MobileHeader />
            <div className='mobile-menu' onClick={() => setClicked(!clicked)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm6 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z" clip-rule="evenodd"/></svg>
            </div>
           </div> }
          { !isMobile && <Sidebar />}
        </div>            
        <div className={`flex-grow-1 p-4 ${isMobile ? 'mobile-content' : ''} app-wrapper  overflow-hidden h-100`} style={{marginLeft: !isMobile ? 280 : null}}>
          <Outlet />
        </div>  
        <div>
          {isMobile && <MobileNav />}
        </div>  
      </div>     
      { atLoad && isMobile && <div className='popup-open ' onClick={() => setAtLoad(false)}>
        <div className="close"><svg xmlns="http://www.w3.org/2000/svg" className='' width="48" height="48" viewBox="0 0 24 24"><path fill="" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg></div>
      </div> }
      {atLoad && isMobile && <div className='mobile-popup custom-color-responsiveness p-5 fw-bold'>Please switch to desktop for the best experience</div>}        
      { clicked && isMobile && 
        <>
          <motion.div initial={{ opacity: 0, x: -20}} animate={{ opacity:1, x: 0}} exit={{ opacity: 0, x: -20}} transition={{ duration: 0.1, ease: 'linear'}} className='custom-blur' onClick={() => setClicked(false)} ></motion.div>
          <motion.div initial={{ opacity: 0, x: 20}} animate={{ opacity:1, x: 0}} exit={{ opacity: 0, x: 20}} transition={{ duration: 0.1, ease: 'linear'}} className='mobile-menu-popup'>
            <div className='mobile-menu-close' onClick={() => setClicked(false)}>
              <svg xmlns="http://www.w3.org/2000/svg"  width="35" height="35" viewBox="0 0 24 24"><path fill="#858585" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg>
            </div>
            <div className=' d-flex flex-column gap-3 p-4 mt-5 mobile-links'>
                <a href="https://github.com/MD0516" target='_blank' rel="noopener noreferrer" style={{color: '#858585'}} className='text-decoration-none'>
                  <i className='bi bi-github fs-4 '></i> <span>Github</span>
                </a>
                <a href="https://www.linkedin.com/in/murali-dharan-30163a248/" target='_blank' rel="noopener noreferrer" style={{color: '#858585'}} className='text-decoration-none'>
                  <i className='bi bi-linkedin fs-4'></i> <span>LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/hatetosocializ.e/" target='_blank' rel="noopener noreferrer" style={{color: '#858585'}} className='text-decoration-none'>
                  <i className='bi bi-instagram fs-4'></i> <span>Instagram</span>
                </a>
                <a href="https://wa.me/919941161100?text=Hi%20Murali%2C%20I%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20your%20work.%20Can%20we%20talk%3F" target='_blank' rel="noopener noreferrer" style={{color: '#858585'}} className='text-decoration-none'>
                  <i className='bi bi-whatsapp fs-4'></i> <span>WhatsApp</span>
                </a>
                <a href='/Resume.pdf' download='Murali-Dharan-Resume.pdf' target='_blank' className='text-decoration-none resume-download' style={{color: '#858585'}} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M1.44.44A1.5 1.5 0 0 1 2.5 0h6a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 13 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 12.5v-11c0-.398.158-.78.44-1.06m5.747 10.502l.104-.104c.116-.076.216-.176.292-.292l1.854-1.854a.625.625 0 0 0-.442-1.067h-1.25V4a1 1 0 0 0-2 0v3.625h-1.25a.625.625 0 0 0-.442 1.067l1.854 1.854c.076.116.176.216.292.292l.104.104a.625.625 0 0 0 .884 0" clip-rule="evenodd"/></svg> 
                  <span>Resume</span>
                </a> 
              </div>
          </motion.div>
        </>
      }
    </>
  )
}

export default Layout