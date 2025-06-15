import { useEffect, useRef, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import MobileHeader from '../Components/MobileHeader'
import MobileNav from '../Components/MobileNav'

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
    
  }, []);

  return (
    <>
      <LoadingBar color='#7c7b7b' ref={ref} height={2} background='transparent' shadow={false} />
        <div className='d-flex flex-column flex-md-row'>
          <div>
            {!isMobile && <MobileHeader />}
            { isMobile && <Sidebar />}
          </div>            
          <div className={`flex-grow-1 p-4 ${!isMobile ? 'mobile-content' : ''}`}>
              <Outlet />
          </div>  
          <div>
            {!isMobile && <MobileNav />}
          </div>          
        </div>
    </>
  )
}

export default Layout