import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleResize(); // Initial check

    mediaQuery.addEventListener('change', handleResize); // For screen size changes

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);


  return (
    <>
      <LoadingBar color='#7c7b7b' ref={ref} height={2} background='transparent' shadow={false} />
        <div className='d-flex flex-column flex-md-row'>
          <div>
            {isMobile && <MobileHeader />}
            { !isMobile && <Sidebar />}
          </div>            
          <div className={`flex-grow-1 p-4 ${isMobile ? 'mobile-content' : ''}`} style={{marginLeft: !isMobile ? 280 : null}}>
              <Outlet />
          </div>  
          <div>
            {isMobile && <MobileNav />}
          </div>          
        </div>
    </>
  )
}

export default Layout