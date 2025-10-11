import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import dp from '/Image/DP.webp?url'
import { useStateContext } from '../Context/StateContext';

const Sidebar = () => {
  const location = useLocation();
  const current = location.pathname.split('/')[1];
  const tab = current === "" ? "explore" : current;
  const { toggleSidebar, handleSidebar, showText, activeGrow } = useStateContext();

  const navItems = [
    {
      path: "/explore",
      name: "Explore",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={tab === 'explore' || tab === '' ? 'icon' : ''} viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 17.5L14 14l3.5-7.5L10 10l-3.5 7.5ZM12 13q-.425 0-.713-.288T11 12q0-.425.288-.713T12 11q.425 0 .713.288T13 12q0 .425-.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z" /></svg>,
      isActive: tab === "explore"
    },
    {
      path: "/skills",
      name: "Skills",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={tab === 'skills' ? 'icon' : ''} viewBox="0 0 32 32"><path fill="currentColor" d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8z" /></svg>,
      isActive: tab === "skills"
    },
    {
      path: "/projects",
      name: "Projects",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={tab === 'projects' ? 'icon' : ''} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3" /></g></svg>,
      isActive: tab === "projects"
    },
    {
      path: "/about",
      name: "About",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={tab === 'about' ? 'icon' : ''} viewBox="0 0 1280 1536"><path fill="currentColor" d="M1280 1271q0 109-62.5 187t-150.5 78H213q-88 0-150.5-78T0 1271q0-85 8.5-160.5t31.5-152t58.5-131t94-89T327 704q131 128 313 128t313-128q76 0 134.5 34.5t94 89t58.5 131t31.5 152t8.5 160.5zm-256-887q0 159-112.5 271.5T640 768T368.5 655.5T256 384t112.5-271.5T640 0t271.5 112.5T1024 384z" /></svg>,
      isActive: tab === "about"
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={tab === 'contact' ? 'icon' : ''} viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.134 2.995L2.217 11.5a1 1 0 0 0 .866 1.5h9.834a1 1 0 0 0 .866-1.5L8.866 2.995a1 1 0 0 0-1.732 0m3.03-.751c-.962-1.665-3.366-1.665-4.329 0L.918 10.749c-.963 1.666.24 3.751 2.165 3.751h9.834c1.925 0 3.128-2.085 2.164-3.751z" clip-rule="evenodd" /></svg>,
      isActive: tab === "contact"
    },
  ]

  const socialLinks = [
    {
      link: "https://github.com/MD0516",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 432 416"><path fill="currentColor" d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z" /></svg>
    },
    {
      link: "https://www.linkedin.com/in/murali-dharan-30163a248/",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"><path fill="currentColor" d="M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531c-1.544 0-1.78 1.204-1.78 2.449v4.722H7.793V7.5h2.844v1.3h.039c.397-.75 1.364-1.54 2.808-1.54c3.001 0 3.556 1.974 3.556 4.545v5.238ZM4.447 6.194c-.954 0-1.72-.771-1.72-1.72s.767-1.72 1.72-1.72a1.72 1.72 0 0 1 0 3.44Zm1.484 10.85h-2.97V7.5h2.97v9.543ZM18.521 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042c.815 0 1.482-.644 1.482-1.44V1.44C20 .646 19.333 0 18.518 0h.003Z" /></svg>
    },
    {
      link: "https://www.instagram.com/hatetosocializ.e/",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C8.74 0 8.333.015 7.053.072C5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053C.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384a5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913c.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071c1.17.055 1.805.249 2.227.415c.562.217.96.477 1.382.896c.419.42.679.819.896 1.381c.164.422.36 1.057.413 2.227c.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382a3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413c-1.274.057-1.649.07-4.859.07c-3.211 0-3.586-.015-4.859-.074c-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899a3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235c-.045-1.26-.061-1.649-.061-4.844c0-3.196.016-3.586.061-4.861c.061-1.17.255-1.814.42-2.234c.21-.57.479-.96.9-1.381c.419-.419.81-.689 1.379-.898c.42-.166 1.051-.361 2.221-.421c1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0a1.44 1.44 0 0 1 2.88 0z" /></svg>
    },
    {
      link: "https://wa.me/919941161100?text=Hi%20Murali%2C%20I%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20your%20work.%20Can%20we%20talk%3F",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
    },
    {
      link: "/Resume.pdf",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M8 8a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm5 12H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v2a1 1 0 0 0 2 0V8.94a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19a.29.29 0 0 0-.1 0a1.1 1.1 0 0 0-.31-.11H6a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h7a1 1 0 0 0 0-2Zm0-14.59L15.59 8H14a1 1 0 0 1-1-1ZM14 12H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm6.71 6.29a1 1 0 0 0-1.42 0l-.29.3V16a1 1 0 0 0-2 0v2.59l-.29-.3a1 1 0 0 0-1.42 1.42l2 2a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l2-2a1 1 0 0 0 0-1.42ZM12 18a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2Z" /></svg>
    },
  ]

  return (
    <>
      <motion.div
        key='sidebar-text'
        animate={{ width: toggleSidebar ? 70 : 250 }}
        transition={{ duration: .5, ease: 'easeInOut' }}
        className={`d-flex flex-column gap-3 align-items-center p-4 position-fixed sidebar `}
        style={{ zIndex: 998 }}
      >
        <div className='d-flex gap-3 align-items-center' >
          <div
            style={{ width: 40, height: 40 }}
            className='rounded-circle bg-white d-flex justify-content-center align-items-center dp'
          >
            <img src={dp} alt="profile-pic" loading='lazy' />
          </div>
          {!toggleSidebar && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              style={{ paddingLeft: 25}}
            >
              <p className='m-0 p-0 text-white fw-bold'>Murali Dharan</p>
              <p className='m-0 p-0 fw-' style={{ color: '#858585' }}>Full-Stack Developer</p>
            </motion.div>)
          }
        </div>

        {!toggleSidebar && (
          <motion.div
            key={toggleSidebar ? 'collapsed' : 'expanded'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`d-flex align-items-center gap-3 custom-hover`}
          >
            {
              socialLinks.map((item, index) => (
                <a key={index} href={item.link} target='_blank' rel="noopener noreferrer" style={{ color: '#858585' }}>
                  {item.icon}
                </a>
              ))
            }
          </motion.div>)
        }

        <motion.div className='d-flex flex-column gap-3 nav' style={{ marginTop: toggleSidebar ? "50px" : '' }}>
          {
            navItems.map((item, index) => (
              <Link
                key={index}
                component={motion.button}
                to={item.path}
                className={`${item.isActive ? 'active' : ""}`}
              >
                <motion.div className='d-flex justify-content-start align-items-center gap-2'
                  style={{ backgroundColor: "transparent", width: activeGrow ? 150 : '' }}
                >
                  <span >
                    {item.icon}
                  </span>
                  {!toggleSidebar && showText && (
                    <motion.span
                      key={item.name}
                      initial={{ opacity: 0, x: -200 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -200 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            ))
          }
        </motion.div>
      </motion.div>

      <motion.div key='sidebar-toggle'
        initial={{ left: 235}}
        animate={{ rotate: toggleSidebar ? 180 : 0, left: toggleSidebar ? 60 : 235 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={` d-flex justify-content-center align-items-center text-white position-fixed toggle-button`}
        onClick={handleSidebar} style={{ top: 10, zIndex: 999 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M31 36L19 24L31 12" /></svg>
      </motion.div>
    </>
  )
}

export default Sidebar;