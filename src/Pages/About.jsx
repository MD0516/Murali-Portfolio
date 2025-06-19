import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import dp from '/Image/DP.webp?url'

const About = () => {
  const events = [
    { year: '2022-2025', title: 'B.Com Computer Application', desc: 'Graduated from Hindustan College of Arts & Science' },
    { year: 'Jan 2025 - May 2025', title: 'Full Stack Development', desc: 'Completed Full Stack Development at Fita Academy' },
    { year: 'June 2025 - Present', title: 'Intern Front-End Developer', desc: 'Currently working as a Front-End Intern Developer at ARKFA' },
  ];

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
        {animateNow && <motion.div initial={{opacity: 0, y: -400}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -400}} transition={{duration: .8, ease: 'easeInOut'}} className='container-fluid py-2  custom-color-responsiveness'>
          <h2 className='text-white fs-1 fw-bolder'>Who I Am</h2>
          <p className='fw-semibold fs-5'>Just a Developer Who Loves to Learn</p>
        </motion.div>}
      </AnimatePresence>
      <div className='container-fluid py-2  custom-color-responsiveness'>
        <div className='row'>
          {animateNow && <>
          <motion.div initial={{opacity: 0, y: xDir}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: xDir}} transition={{duration: 0.8, ease: 'easeInOut'}}  className='col-12  '>
            <motion.p initial={{opacity: 0, x: -xDir}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -xDir}} transition={{duration: 1, ease: 'easeInOut'}} className='about-text lh-lg'>
              I'm a Front-End developer based in Madipakkam, Chennai, with a passion for building digital experiences. Outside of coding, I enjoy playing cricket, watching series and movies, and listening to music — activities that keep me balanced, focused, and creatively inspired. 
            </motion.p> 
            <motion.p initial={{opacity: 0, x: xDir}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: xDir}} transition={{duration: 1, ease: 'easeInOut'}} className='about-text lh-lg'>
              Beyond the technical skills, I take pride in being a keen observer and an eager learner, always looking for better ways to solve problems and refine my craft. 
              Whether it’s writing clean code or collaborating with a team, I aim to add clarity, creativity, and impact to every project I work on.
            </motion.p>
          </motion.div>
          </>}
        </div>
      </div>

      { animateNow && <motion.div initial={{opacity: 0, y:200}} whileInView={{opacity:1, y:0}} exit={{opacity:0, y:200}} transition={{duration:.8, ease: 'easeInOut'}} viewport={{once: true}} className='container-fluid py-2  custom-color-responsiveness about-skills'>
        <h3 className='text-white fs-2 fw-bolder'>Expanding My Stack</h3>
        <p className='lh-lg p-1'>I'm currently deepening my knowledge in backend development by exploring advanced Node.js concepts and building RESTful APIs. I'm also learning how to integrate MongoDB for handling data efficiently and working on deploying full-stack applications using AWS to better understand real-world hosting environments.</p>
        <Link to='/skills' className='text-decoration-none p-1' style={{ color: '#858585' }}>See More...</Link>
      </motion.div>}

      {animateNow && <motion.div initial={{opacity: 0, y:200}} whileInView={{opacity:1, y:0}} exit={{opacity:0, y:200}} transition={{duration:.8, ease: 'easeInOut'}} viewport={{once: true}} className='container-fluid py-2  custom-color-responsiveness'>
        <h3 className='text-white fs-2 fw-bolder'>Timeline</h3>
        <div  className='d-flex justify-content-center align-items-center'>
          {animateNow && <motion.div initial={{ opacity: 0, height:0 }} whileInView={{opacity: 1, height: '100%'}} transition={{ duration: 1 }} viewport={{ once: true }} className='timeline'>         
            <ul className=" list-unstyled">
              {events.map((event, index) => (
                <motion.li initial={{opacity: 0, y:-100}} animate={{opacity: 1, y: 0}} exit={{ opacity: 0, y: -100}} transition={{ duration: 1, delay: index * .1}} key={index} className={`${ index == 1 ? 'timeline-child' : ''} position-relative`}>
                  <motion.div initial={{scale: 0}} whileInView={{ scale: 1}} transition={{ duration: .5, type: 'spring', stiffness: 300}} className="timeline-dot"></motion.div>
                  <div className="ms-4">
                    <h5 className="fw-bold">{event.year}</h5>
                    <h6>{event.title}</h6>
                    <p>{event.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div> }
        </div>        
      </motion.div>}

      {animateNow && <motion.div initial={{opacity: 0, y:200}} whileInView={{opacity:1, y:0}} exit={{opacity:0, y:200}} transition={{duration:.8, ease: 'easeInOut'}} viewport={{once: true}} className='container-fluid py-2 my-5 custom-color-responsiveness about-footer'>
          <div className='row gap-5'>

            <motion.div initial={{opacity: 0, x: -xDir}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -xDir}} transition={{duration: 0.8}} className='col-12 col-md-5 about-footer-card'>
              <div className='about-footer-heading'>
                <h5 className='fw-semibold'>Have something in mind? Let’s talk</h5>
              </div>
              <div className='about-footer-link-div'>
                <Link className='text-decoration-none fw-semibold about-footer-link d-block'>
                  Contact Me
                </Link>
              </div>
              
            </motion.div>

            <motion.div initial={{opacity: 0, x: xDir}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: xDir}} transition={{duration: 0.8}} className='col-12 col-md-5 about-footer-card'>  
              <div className='about-footer-heading'>
                <h5 className='fw-semibold'>Ready to Collaborate? Get My Resume</h5>
              </div>
              <div className='about-footer-link-div'>
                <a href='/Resume.pdf' download='Murali-Dharan-Resume.pdf' className='text-decoration-none fw-semibold about-footer-link d-block'>
                  Download Resume
                </a>                
              </div>

            </motion.div>
          </div>
        </motion.div>  }    
    </div>
  )
}

export default About