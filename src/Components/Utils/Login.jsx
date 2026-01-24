import { ErrorMessage, Field, Form, Formik } from 'formik'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import * as yup from "yup"
import { adminLogin } from '../../Store/authSlice'
import { useStateContext } from '../../Context/StateContext'
import { useNavigate } from 'react-router-dom'

const initialValues = {
    email: "",
    password: ""
}

const validationSchema = yup.object({
    email: yup.string().required("Email is required").email("Enter a valid Email address"),
    password: yup.string().required("Password is required").min(8, "Minimum 8 characters")
})

const Login = () => {
    const dispatch = useDispatch();
    const { Toast } = useStateContext();
    const { error } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const onSubmit = async (values, helpers) => {
        try {
            const payload = {...values, rememberMe: true}
            const res = await dispatch(adminLogin(payload))
            if (adminLogin.fulfilled.match(res)) {
                Toast.success("Login Success")
                navigate("/")
            }
            if (adminLogin.rejected.match(res)) {
                Toast.error("Failed", error)
            }
        } finally {
            helpers.resetForm()
        }
    }
    return (
        <div className='login-page d-flex justify-content-center align-items-center'>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className='login-form p-4 rounded'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    className="custom-transparent"
                >
                    <Form className='custom-transparent'>
                        <div className='form-field mb-3'>
                            <label htmlFor="email">Email <span>*</span></label>
                            <Field name="email" id="email" type="email" className="" />
                            <ErrorMessage component={"p"} name='email' className='text-danger' />
                        </div>
                        <div className='form-field mb-3'>
                            <label htmlFor="password">Password <span>*</span></label>
                            <Field name="password" id="password" type="password" />
                            <ErrorMessage component={"p"} name='password' className='text-danger' />
                        </div>
                        <div className='forgot-pass d-flex justify-content-end mb-3 custom-transparent cursor-pointer'>
                            Forgot Password?
                        </div>
                        <div className='custom-transparent login-btn d-flex justify-content-center mb-3'>
                            <motion.button whileHover={{ y: -3 }} whileTap={{ scale: .90 }} transition={{ duration: .2 }} type='submit' className='rounded px-5 py-2 d-flex justify-content-center align-items-center fw-bold'>
                                Login
                            </motion.button>
                        </div>
                    </Form>
                </Formik>
            </motion.div>
        </div>
    )
}

export default Login