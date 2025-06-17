import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TypingText from '../Components/TypingText'
import { motion, AnimatePresence } from 'framer-motion'

const Explore = () => {
  const links = [
    {
      title: 'Skills',
      description: 'A breakdown of the tools and technologies I use',
      path: '/skills'
    },
    {
      title: 'Projects',
      description: "A showcase of the web applications I’ve built",
      path: '/projects'
    },
    {
      title: 'Background',
      description: 'A glimpse into my journey, goals, and values',
      path: '/about'
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
    <div className='d-flex flex-column align-items-center justify-content-around content-height'>

      <AnimatePresence>
        {animateNow && <motion.div initial={{opacity: 0, y:-400}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-400}} transition={{duration:.8, ease: 'easeInOut'}} className="container-fluid py-2  custom-color-responsiveness" >
          <div className='row text-white'>
            <h1 className=''>Hi, I'm Murali Dharan</h1>
            <h2><TypingText text={'Front End Developer'} speed={70} /></h2> 
          </div>
          <div className='row'>
            <p className='intro fw-semibold '>
              Crafting seamless web interfaces with modern tech. I build fast, responsive, and engaging user experiences.
            </p>
          </div>
        </motion.div>}
      </AnimatePresence>

        {animateNow && 
        <motion.div initial={{opacity: 0, y:200}} whileInView={{opacity:1, y:0}} exit={{opacity:0, y:200}} transition={{duration:.8, ease: 'easeInOut'}} viewport={{once: true}} className='container-fluid py-2 custom-color-responsiveness '>
          <h3 className='text-white '>What you'll Find Here :</h3>
          <div className='row g-4 my-2'>
            {
              links.map((index, i) =>{
                const fromDir = i % 2 == 0 ? -xDir : xDir
                return (
                  <>
                    <motion.div initial={{opacity: 0, x: fromDir}} whileInView={{opacity:1, x: 0}} transition={{duration: .8, ease: 'easeInOut'}} viewport={{once: true}} className='col-md-6 col-lg-6 custom-card'>
                      <div key={i} className='link-grid '>
                        <h3>{index.title}</h3>
                        <p>{index.description}</p>
                      </div>
                      <Link to={index.path} className='text-decoration-none link '> Click here</Link>
                    </motion.div>
                  </>
                )})
            }
          </div>
        </motion.div>}

      <AnimatePresence>
        {animateNow && <motion.div initial={{opacity: 0, y: xDir}} whileInView={{opacity:1, y:0}} exit={{opacity:0, y: xDir}} transition={{duration:.8, ease: 'easeInOut'}} viewport={{once: true}} className='container-fluid py-2 custom-color-responsiveness'>
          <h3 className='text-white '>Why this portfolio ?</h3>
          <div className='row my-3'>
            <div className='col'>
              <p>
                This site is more than just a resume — it’s a reflection of my growth as a developer, and a platform to explore new ideas and challenges.
              </p>
              <p>
                Let’s build something cool together
              </p>
              <Link to='/contact' className='text-decoration-none btn btn-dark custom-btn' >Contact Me</Link>
            </div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </div>
  )
}

export default Explore