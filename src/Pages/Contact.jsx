import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react'

const Contact = () => {

  const [ isClicked, setIsClicked ] = useState(false);
  const [ copied, setCopied ] = useState(false);
  const textToCopy = 'msmurali2005@gmail.com'

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true)
    setTimeout ( () => setCopied(false), 2000)
  }

  const handleClicked = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 500)
    console.log('clicked')
  }

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
        {animateNow && <motion.div initial={{opacity: 0, y: -400}} animate={{ opacity: 1, y: 0}} exit={{opacity: 0, y: -400}} transition={{ duration: .8, ease: 'easeInOut'}} className='container-fluid py-2 custom-color-responsiveness'>
          <h2 className='text-white fs-1 fw-bolder'>Ideas? Let’s Make Them Real</h2>
          <p className='fw-semibold fs-5'>Your idea. My code. Let’s create.</p>

          <div className='d-flex gap-3 '>
            <motion.a initial={{opacity: 0, x: -xDir}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -xDir}} transition={{duration: 0.8, ease: 'easeInOut'}} href="https://wa.me/919941161100?text=Hi%20Murali%2C%20I%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20your%20work.%20Can%20we%20talk%3F" target='_blank' className='fw-semibold contact-whatsapp py-2 px-4 text-white rounded-3 text-decoration-none'>
              Whatsapp
            </motion.a>
            <motion.button initial={{opacity: 0, x: xDir}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: xDir}} transition={{duration: 0.8, ease: 'easeInOut'}} className='d-flex gap-1 fw-semibold py-2 px-4 contact-email rounded-3' onClick={handleCopy}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="currentColor"><path d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593c.734-.737 1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.601 3.601 0 0 0 15.24 2Z"/><path d="M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847c.843.847.843 2.21.843 4.936v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936v-4.82Z"/></g></svg>
              { copied ? ('Copied !') : ( 'Email' )}
            </motion.button>
          </div>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {animateNow && <motion.div initial={{ opacity: 0, y: 400}} animate={{ opacity: 1, y: 0}} exit={{ opacity: 0, y: 400}} transition={{ duration: .8, ease: 'easeInOut'}} className='container-fluid py-2 custom-color-responsiveness'>
          <div className='contact-form p-3 rounded-3'>
            <div className='custom-bg'>
              <h5 className='contact-form-title fs-4 text-white fw-bold'> Drop Me a Message</h5>
              <p className='contact-form-tagline lh-lg fw-semibold'> I’ll get back to you faster than you expect</p>
            </div>

            <form action="">
              <div className='container g-3 custom-bg'>              
                <div className='row my-2 custom-bg g-3'>
                  <motion.div initial={{ opacity: 0, scale: 10}} animate={{ opacity: 1, scale: 1}} exit={{ opacity: 0, scale: 10}} transition={{duration: 0.8, ease: 'easeInOut'}} class="form-floating col-12 col-lg-6 custom-bg">
                    <input type="text" class="form-control form-input" name="name" id="formId1" placeholder="" />
                    <label for="name" className='form-label fw-bold'>Name</label>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 10}} animate={{ opacity: 1, scale: 1}} exit={{ opacity: 0, scale: 10}} transition={{duration: 0.8, ease: 'easeInOut'}} class="form-floating col-12 col-lg-6 custom-bg">
                    <input type="email" class="form-control form-input" name="email" id="formId2" placeholder="" />
                    <label for="email" className='form-label fw-bold'>E-mail</label>
                  </motion.div>
                </div>
                <div  className='row my-2 custom-bg'>
                  <motion.div initial={{ opacity: 0, scale: 10}} animate={{ opacity: 1, scale: 1}} exit={{ opacity: 0, scale: 10}} transition={{ duration: .8, ease: 'easeInOut'}}  class="form-floating col-12 custom-bg">
                    <textarea class="form-control form-input form-textarea" name="message" id="formId3" placeholder="" />
                    <label htmlFor="message" className='form-label fw-bold'>Message</label>
                  </motion.div>
                </div>  
                <div className='row my-2 custom-bg'>
                  <motion.div initial={{ opacity: 0, scale: 10}} animate={{ opacity: 1, scale: 1}} exit={{ opacity: 0, scale: 10}} transition={{ duration: .8, ease: 'easeInOut'}} className={`custom-bg col-12 py-2 submit-button ${ isClicked ? 'submit-button-active' : '' }`} onClick={handleClicked}>
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" className='custom-transparent mx-1' width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.76 12H6.832m0 0c0-.275-.057-.55-.17-.808L4.285 5.814c-.76-1.72 1.058-3.442 2.734-2.591L20.8 10.217c1.46.74 1.46 2.826 0 3.566L7.02 20.777c-1.677.851-3.495-.872-2.735-2.591l2.375-5.378A2 2 0 0 0 6.83 12"/></svg>
                  </motion.div>
                </div>          
              </div>
            </form>

          </div>
        </motion.div>}
      </AnimatePresence>
    </div>
  )
}

export default Contact