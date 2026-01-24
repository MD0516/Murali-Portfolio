import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react'
import EmptyFieldsAlert from '../Components/Utils/EmptyFieldsAlert';
import { useDispatch, useSelector } from 'react-redux';
import { SendHorizonal } from 'lucide-react';
import { postMessage } from '../Store/contactSlice';
import { useStateContext } from '../Context/StateContext';

const Contact = () => {

  const dispatch = useDispatch();
  const { Toast } = useStateContext();
  const { error: contactError } = useSelector(state => state.contact)

  const [isClicked, setIsClicked] = useState(false);
  const [copied, setCopied] = useState(false);
  const textToCopy = 'msmurali2005@gmail.com'

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClicked = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 500)
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

  const motionPropsPlus = xDir === 200
    ? {
      initial: { opacity: 0, scale: 5 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 5 },
      transition: { duration: 0.8, ease: 'easeInOut' }
    }
    : {
      initial: { opacity: 0, x: 13 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 13 },
      transition: { duration: 0.8, ease: 'easeInOut' }
    };
  const motionPropsMinus = xDir === 200
    ? {
      initial: { opacity: 0, scale: 5 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 5 },
      transition: { duration: 0.8, ease: 'easeInOut' }
    }
    : {
      initial: { opacity: 0, x: -13 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -13 },
      transition: { duration: 0.8, ease: 'easeInOut' }
    };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const [openAlert, setOpenAlert] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setOpenAlert(true);
      return;
    }

    const form = {
      name, email, message
    }

    setIsSubmitting(true);
    const toastId = Toast.loading("Sending...", "Please wait a moment")

    try {
      const res = await dispatch(postMessage(form))
      if (postMessage.fulfilled.match(res)) {
        Toast.update(toastId, {
          type: "success",
          title: "Message sent",
          message: "Thanks for reaching out. I'll get back to you shortly.",
          duration: 2000
        })
      }
      if (postMessage.rejected.match(res)) {
        Toast.update(toastId, {
          type: "error",
          title: "Sending failed",
          message: contactError || "Something went wrong. Please try again.",
          duration: 2000
        })
      }
    } finally {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" })
    }
  };

  return (
    <div className='content-height'>
      <AnimatePresence>
        {animateNow && <motion.div initial={{ opacity: 0, y: -400 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -400 }} transition={{ duration: .8, ease: 'easeInOut' }} className='container-fluid py-2 custom-color-responsiveness'>
          <h2 className='text-white fs-1 fw-bolder'>Ideas? Let's Make Them Real</h2>
          <p className='fw-semibold fs-5'>Your idea. My code. Let's create.</p>

          <div className='d-flex gap-3 '>
            <motion.a initial={{ opacity: 0, x: -xDir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -xDir }} transition={{ duration: 1, ease: 'easeInOut' }} href="https://wa.me/919941161100?text=Hi%20Murali%2C%20I%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20your%20work.%20Can%20we%20talk%3F" target='_blank' className='fw-semibold contact-whatsapp py-2 px-4 text-white rounded-3 text-decoration-none'>
              Whatsapp
            </motion.a>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.1 }
              }}
              whileFocus={{
                scale: 1.02,
                transition: { duration: 0.1 }
              }}
              initial={{ opacity: 0, x: xDir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: xDir,
                transition: { duration: 0.5 }
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className='d-flex gap-2 fw-semibold py-2 px-4 contact-email rounded-3 align-items-center'
              onClick={handleCopy}
              aria-label={copied ? "Email address copied to clipboard" : "Copy email address to clipboard"}
              disabled={copied}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                animate={copied ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <g fill="currentColor">
                  <path d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593c.734-.737 1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.601 3.601 0 0 0 15.24 2Z" />
                  <path d="M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847c.843.847.843 2.21.843 4.936v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936v-4.82Z" />
                </g>
              </motion.svg>

              <motion.span
                key={copied ? "copied" : "email"}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="d-flex align-items-center"
                style={{ backgroundColor: "transparent" }}
              >
                {copied ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="me-1"
                      style={{ backgroundColor: "transparent" }}
                    >
                      ✓
                    </motion.span>
                    Copied!
                  </>
                ) : (

                  'Copy Email'
                )}
              </motion.span>
            </motion.button>
          </div>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {animateNow && <motion.div initial={{ opacity: 0, y: 400 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 400 }} transition={{ duration: .8, ease: 'easeInOut' }} className='container-fluid py-2 custom-color-responsiveness'>
          <div className='contact-form p-3 rounded-3'>
            <div className='custom-bg'>
              <h5 className='contact-form-title fs-4 text-white fw-bold'> Drop Me a Message</h5>
              <p className='contact-form-tagline lh-lg fw-semibold'> I'll get back to you faster than you expect</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='container g-3 custom-bg'>
                <div className='row my-2 custom-bg g-3'>
                  <motion.div {...motionPropsMinus} className="form-floating col-12 col-lg-6 custom-bg">
                    <input type="text" className="form-control form-input" name="name" id="formId1" value={formData.name} placeholder="" onChange={handleChange} disabled={isSubmitting} />
                    <label htmlFor="name" className='form-label fw-bold'>Name</label>
                  </motion.div>
                  <motion.div {...motionPropsPlus} className="form-floating col-12 col-lg-6 custom-bg">
                    <input type="email" className="form-control form-input" name="email" id="formId2" value={formData.email} placeholder="" onChange={handleChange} disabled={isSubmitting} />
                    <label htmlFor="email" className='form-label fw-bold'>E-mail</label>
                  </motion.div>
                </div>
                <div className='row my-2 custom-bg'>
                  <motion.div {...motionPropsMinus} className="form-floating col-12 custom-bg">
                    <textarea className="form-control form-input form-textarea" name="message" id="formId3" value={formData.message} placeholder="" onChange={handleChange} disabled={isSubmitting} />
                    <label htmlFor="message" className='form-label fw-bold'>Message</label>
                  </motion.div>
                </div>
                <div className='row my-2 custom-bg'>
                  <motion.button
                    type='submit'
                    {...motionPropsPlus}
                    className={`custom-bg col-12 py-2 submit-button ${isClicked ? 'submit-button-active' : ''} ${isSubmitting ? 'opacity-75' : ''}`}
                    onClick={handleClicked}
                    disabled={isSubmitting}
                  >
                    <div className='d-flex custom-bg justify-content-center'>
                      {
                        isSubmitting ?
                          "Sending..." :
                          <span className='d-flex align-items-center gap-2 fs-5'>
                            Send <SendHorizonal size={20} />
                          </span>
                      }
                    </div>
                  </motion.button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>}
      </AnimatePresence>
      {openAlert && <EmptyFieldsAlert isOpen={openAlert} onClose={() => setOpenAlert(false)} />}
    </div>
  )
}

export default Contact