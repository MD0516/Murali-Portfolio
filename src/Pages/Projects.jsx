import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ite from '../Assets/Screenshots/ITE.png'
import arkfa from '../Assets/Screenshots/ARKFA.png'

const Projects = () => {

  const projects = [
    {
      logo: ite,
      title: 'Infinity Techno Engineering',
      description: 'A corporate landing page designed to present the company’s profile, services, and contact form in a clean, professional layout',
      technologies: [ 'React', 'Tailwind CSS', 'Google App Script' ],
      link: 'https://md0516.github.io/infinity-techno-engineering/',
    },
    {
      logo: arkfa,
      title: 'ARKFA',
      description: 'A complete company website showcasing services, about section, and pricing — developed while interning at ARKFA as part of their official web team',
      technologies: [ 'React', 'Bootstrap', 'Express' ],
      link: 'https://arkfawebsite.vercel.app/',
    },
  ]

    const [xDir, setXDir] = useState(window.innerWidth > 768 ? 200 : 13);
  
    useEffect(() => {
      const handleResize = () => {
        const isDesktopNow = window.innerWidth > 768;
        setXDir(isDesktopNow ? 200 : 13);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const [animateNow, setAnimateNow] = useState(false);
  
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  
      const timeout = setTimeout(() => {
        setAnimateNow(true);
      }, 500); 
  
      return () => clearTimeout(timeout);
    }, []);

  return (
    <div className='content-height'>
      <AnimatePresence>
        {animateNow && <motion.div initial={{opacity: 0, y: -400}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -400}} transition={{duration: .8, ease: 'easeInOut'}} className="container-fluid py-2 custom-color-responsiveness">
          <h2 className='text-white fs-1 fw-bolder'>Projects</h2>
          <p className='fw-semibold fs-5'>These are just the beginning — I'm continuously building and learning through hands-on development</p>
        </motion.div>}
      </AnimatePresence>
      {animateNow && 
      <motion.div initial={{opacity: 0, y:200}} whileInView={{opacity:1, y:0}} exit={{opacity:0, y:200}} transition={{duration:.8, ease: 'easeInOut'}} viewport={{once: true}} className='container-fluid py-2 custom-color-responsiveness'>
        <div className='row'>
          {
            projects.map((item, i) => {
              const fromDir = i % 2 == 0 ? -xDir : xDir
                return(
                  <>
                    {animateNow && <motion.div initial={{opacity: 0, x: fromDir}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.8, delay: i * 0.1, ease: 'easeInOut'}} viewport={{once: true}} className='project-card col-12 col-md-6 ' key={i}>
                      <div className='project-img d-flex align-items-center justify-content-center'>
                        <img src={item.logo} alt={item.title}  />
                      </div>

                      <div className='project-description'>
                        <div className='project-title p-2'>
                          <h3>{item.title}</h3>
                          <p className='lh-6'>{item.description}</p>                    
                        </div>

                        <div className='tech-stack d-flex gap-3 p-2'>
                          {
                            item.technologies.map((tech, t) => (
                                <p className='tech-name fw-semibold' key={t}>
                                  {tech}
                                </p>
                            ))
                          }
                        </div>

                        <div className='project-link p-2'>
                          <a href={item.link} target='_blank' className='text-decoration-none'> Live Demo <svg xmlns="http://www.w3.org/2000/svg"  width="15" height="15" viewBox="0 0 20 20"><g fill="currentColor"><path d="M11 3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 1 0 1.414 1.414L15 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z"/><path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z"/></g></svg> </a>
                        </div>
                      </div>
                    </motion.div>}
                  </>
                )}
            )
          }
        </div>
      </motion.div>}
    </div>
  )
}

export default Projects