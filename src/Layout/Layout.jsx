import { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import Sidebar from '../Components/UI/Sidebar'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import MobileHeader from '../Components/UI/MobileHeader'
import MobileNav from '../Components/UI/MobileNav'
import { useStateContext } from '../Context/StateContext'
import { useDispatch, useSelector } from "react-redux"
import { checkSession } from '../Store/authSlice'
import { fetchProjects } from '../Store/projectSlice'
import PendingFeedback from '../Components/UI/PendingFeedback'
import DesktopAlert from '../Components/UI/DesktopAlert'
import MobileMenuPopup from '../Components/UI/MobileMenuPopup'
import ToastContainer from '../Components/UI/ToastContainer'
import LoadingBarWrapper from '../Components/UI/LoadingBarWrapper'
import AddProjectButton from '../Components/UI/AddProjectButton'

const Layout = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkSession())
    dispatch(fetchProjects())
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  const { list: projects, error: feedbackError } = useSelector(state => state.projects)
  const { toggleSidebar, isMobile, setAddProject, toasts, Toast } = useStateContext();

  const location = useLocation();
  const ref = useRef(null);
  const path = location.pathname;

  const isProjectsPage = path === '/projects';
  const isAdmin = user?.role === "admin"
  const [showPending, setShowPending] = useState(false)
  const pendingFeedback = JSON.parse(localStorage.getItem("pendingFeedback"));

  useEffect(() => {
    if (pendingFeedback) {
      setShowPending(true)
    } else {
      setShowPending(false)
    }
  }, [showPending, pendingFeedback])

  useEffect(() => {
    ref.current?.continuousStart();
    const timer = setTimeout(() => {
      ref.current?.complete();
    })

    return () => clearTimeout(timer);
  }, [location]);

  const [atLoad, setAtLoad] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      if (isMobile) {
        setAtLoad(true);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [isMobile]);

  useEffect(() => {
    if (atLoad) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [atLoad]);

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [clicked]);

  useEffect(() => {
    const value = localStorage.getItem("showToast")

    if (isProjectsPage && (value === null || value === "true")) {
      Toast.info("How to view project details", "Click on any project card to see more information", 5300, 1.3)
    }
  }, [])

  return (
    <>
      <LoadingBarWrapper />

      <AddProjectButton isAdmin={isAdmin} isProjectsPage={isProjectsPage} setAddProject={setAddProject} />

      <ToastContainer toasts={toasts} />

      <div className='d-flex flex-column flex-md-row'>
        <div>
          {isMobile &&
            <div>
              <MobileHeader />
              <div className='mobile-menu' onClick={() => setClicked(!clicked)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm6 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z" clip-rule="evenodd" /></svg>
              </div>
            </div>}
          {!isMobile && <Sidebar />}
        </div>
        <motion.div transition={{ duration: .5, ease: 'easeInOut' }} className={`flex-grow-1 p-4 ${isMobile ? 'mobile-content' : ''} app-wrapper  overflow-hidden h-100`} animate={{ marginLeft: !isMobile ? (toggleSidebar ? 0 : 280) : null }}>
          <Outlet />
        </motion.div>
        <div>
          {isMobile && <MobileNav />}
        </div>
      </div>

      {atLoad && isMobile &&
        <DesktopAlert isMobile={isMobile} atLoad={atLoad} setAtLoad={setAtLoad} />
      }

      {clicked && isMobile &&
        <MobileMenuPopup clicked={clicked} setClicked={setClicked} />
      }

      {isAuthenticated && showPending &&
        <PendingFeedback
          pendingFeedback={pendingFeedback}
          projects={projects}
          onClose={() => {
            setShowPending(false);
            localStorage.removeItem("pendingFeedback")
          }}
          user={user}
          error={feedbackError}
        />
      }
    </>
  )
}

export default Layout