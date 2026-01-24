import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from "framer-motion"
import { X } from 'lucide-react'
import * as Yup from 'yup';
import { useRef } from 'react';
import { useStateContext } from '../../Context/StateContext';
import { addProject, editProject } from '../../Store/projectSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddProject = ({ onClose, project }) => {
    const submitRef = useRef();
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.projects)
    const { Toast } = useStateContext()
    const mode = project ? "edit" : "add"
    const id = mode === "edit" ? project?._id : null;

    const initialValues = {
        image: project?.image || "",
        title: project?.title || "",
        short_description: project?.short_description || "",
        description: project?.description || "",
        technologies: project?.technologies || [],
        link: project?.link || "",
        repo_mode: project?.repo_mode || "public",
        repo_link: project?.repo_link || "",
        key_features: project?.key_features || [],
        my_role: project?.my_role || "",
        status: project?.status || "completed",
        what_i_learned: project?.what_i_learned || [],
        organization: project?.organization || "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        short_description: Yup.string().required('Short description is required'),
        description: Yup.string().required('Description is required'),
        my_role: Yup.string().required('My role is required'),
        image: Yup.string().url('Invalid image URL').required('Image URL is required'),
        technologies: Yup.array().of(Yup.string()).min(1, 'At least one technology is required'),
        key_features: Yup.array().of(Yup.string()).min(1, 'At least one key feature is required'),
        what_i_learned: Yup.array().of(Yup.string()).min(1, 'At least one what I learned is required'),
        link: Yup.string().url('Invalid URL').nullable(),
        repo_link: Yup.string().url('Invalid URL').nullable(),
        repo_mode: Yup.string().oneOf(['public', 'private'], 'Invalid repository mode').required('Repository mode is required'),
        status: Yup.string().oneOf(['completed', 'in_progress', 'planned'], 'Invalid status').required('Status is required'),
        organization: Yup.string().nullable(),
    })

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (mode === "add") {
                const res = await dispatch(addProject(values))
                if (addProject.fulfilled.match(res)) {
                    Toast.success("Added", "Project added successfully")
                }
                if (addProject.rejected.match(res)) {
                    Toast.error("Failed", error)
                }
            }

            if (mode === "edit") {
                const payload = {
                    id, payload: values
                }
                const res = await dispatch(editProject(payload))
                if (editProject.fulfilled.match(res)) {
                    Toast.success("Added", "Project added successfully")
                }
                if (editProject.rejected.match(res)) {
                    Toast.error("Failed", error)
                }
            }
        } finally {
            resetForm();
            onClose();
        }
    }

    return (
        <div className='custom-blur-full' onClick={onClose}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className='d-flex flex-column justify-content-center align-items-center p-3 gap-3 my-3 mx-auto custom-transparent add-project-modal'
            >
                <div className='header custom-transparent mb-3 w-100 d-flex justify-content-between align-items-start'>
                    <h2 className='text-white fs-1 fw-bolder'>
                        {mode === "add" ? "Add" : "Edit"} Project
                    </h2>
                    <span className='cursor-pointer custom-blur-close custom-transparent' onClick={onClose}>
                        <X size={30} className='custom-transparent' color='white' />
                    </span>
                </div>

                <div className="form-section custom-transparent w-100">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                        className="custom-transparent"
                    >
                        <Form className='custom-transparent container-fluid'>
                            <div className="row custom-transparent">
                                <div className="form-field custom-transparent mb-3 col-12 col-md-6">
                                    <label htmlFor="title">Project Title <span>*</span></label>
                                    <Field name="title" id="title" type="text" />
                                    <ErrorMessage component={"p"} name='title' className='text-danger' />
                                </div>

                                <div className="form-field custom-transparent mb-3 col-12 col-md-6">
                                    <label htmlFor="image">Image URL <span>*</span></label>
                                    <Field name="image" id="image" type="text" />
                                    <ErrorMessage component={"p"} name='image' className='text-danger' />
                                </div>
                            </div>

                            <div className="row custom-transparent">
                                <div className="form-field custom-transparent mb-3 col-12">
                                    <label htmlFor="short_description">Short Description <span>*</span></label>
                                    <Field name="short_description" id="short_description" />
                                    <ErrorMessage component={"p"} name='short_description' className='text-danger' />
                                </div>
                            </div>

                            <div className="row custom-transparent">
                                <div className="form-field custom-transparent mb-3 col-12">
                                    <label htmlFor="description">Description <span>*</span></label>
                                    <Field name="description" id="description" as="textarea" rows="3" className="rounded" />
                                    <ErrorMessage component={"p"} name='description' className='text-danger' />
                                </div>
                            </div>

                            <div className="row custom-transparent">
                                <div className="form-field custom-transparent mb-3 col-12 col-md-4">
                                    <label htmlFor="repo_mode">Repository Mode <span>*</span></label>
                                    <Field name="repo_mode" id="repo_mode" as="select">
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </Field>
                                    <ErrorMessage component={"p"} name='repo_mode' className='text-danger' />
                                </div>

                                <div className="form-field custom-transparent mb-3 col-12 col-md-4">
                                    <label htmlFor="status">Status <span>*</span></label>
                                    <Field name="status" id="status" as="select">
                                        <option value="completed">Completed</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="planned">Planned</option>
                                    </Field>
                                    <ErrorMessage component={"p"} name='status' className='text-danger' />
                                </div>

                                <div className="form-field custom-transparent mb-3 col-12 col-md-4">
                                    <label htmlFor="organization">Organization</label>
                                    <Field name="organization" id="organization" type="text" />
                                    <ErrorMessage component={"p"} name='organization' className='text-danger' />
                                </div>
                            </div>

                            <div className="row custom-transparent">
                                <div className="form-field custom-transparent mb-3 col-12 col-md-4">
                                    <label htmlFor="link">Website Link</label>
                                    <Field name="link" id="link" type="text" />
                                    <ErrorMessage component={"p"} name='link' className='text-danger' />
                                </div>

                                <div className="form-field custom-transparent mb-3 col-12 col-md-4">
                                    <label htmlFor="repo_link">Repository Link</label>
                                    <Field name="repo_link" id="repo_link" type="text" />
                                    <ErrorMessage component={"p"} name='repo_link' className='text-danger' />
                                </div>

                                <div className="form-field custom-transparent mb-3 col-12 col-md-4">
                                    <label htmlFor="my_role">My Role</label>
                                    <Field name="my_role" id="my_role" type="text" />
                                    <ErrorMessage component={"p"} name='my_role' className='text-danger' />
                                </div>
                            </div>

                            <div className="row custom-transparent">
                                <div className="form-field custom-transparent mb-3 col-12">
                                    <label htmlFor="technologies">Technologies Used (comma separated ", ") <span>*</span> </label>
                                    <Field name="technologies" >
                                        {({ field, form }) => {
                                            return (
                                                <textarea
                                                    {...field}
                                                    rows={3}
                                                    className="rounded"
                                                    id="technologies"
                                                    onBlur={(e) => {
                                                        const arr = e.target.value.split(", ").map(v => v.trim())

                                                        form.setFieldValue(field.name, arr)
                                                    }}
                                                />
                                            )
                                        }}
                                    </Field>
                                    <ErrorMessage component={"p"} name='technologies' className='text-danger' />
                                </div>
                            </div>

                            <div className="row custom-transparent">
                                <div className="form-field custom-transparent mb-3 col-12">
                                    <label htmlFor="key_features">Key Features (comma separated ", ") <span>*</span> </label>
                                    <Field name="key_features" >
                                        {({ field, form }) => (
                                            <textarea
                                                {...field}
                                                id='key_features'
                                                rows={3}
                                                className='rounded'

                                                onBlur={(e) => {
                                                    const arr = e.target.value.split(", ").map(v => v.trim())

                                                    form.setFieldValue(field.name, arr)
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage component={"p"} name='key_features' className='text-danger' />
                                </div>
                            </div>

                            <div className="row custom-transparent">
                                <div className="form-field custom-transparent mb-3 col-12">
                                    <label htmlFor="what_i_learned">What I Learned (comma separated ", ") <span>*</span> </label>
                                    <Field name="what_i_learned" >
                                        {({ field, form }) => (
                                            <textarea
                                                {...field}
                                                id='what_i_learned'
                                                rows={3}
                                                className='rounded'
                                                onBlur={(e) => {
                                                    const arr = e.target.value.split(", ").map(v => v.trim())

                                                    form.setFieldValue(field.name, arr)
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage component={"p"} name='what_i_learned' className='text-danger' />
                                </div>
                            </div>

                            <button ref={submitRef} type="submit" className='d-none'>Submit</button>
                        </Form>
                    </Formik>

                </div>
                <div className="project-modal-footer custom-transparent w-100 d-flex justify-content-end mt-3">
                    <div className="footer-btns d-flex gap-3 custom-transparent">
                        <motion.button whileHover={{ y: -3 }} whileTap={{ scale: .95 }} className='project-close-btn rounded px-3 py-1' onClick={onClose}>Close</motion.button>
                        <motion.button type='submit' whileHover={{ y: -3 }} whileTap={{ scale: .95 }} disabled={loading} className='project-submit-btn rounded px-3 py-1' onClick={() => submitRef.current?.click()}>
                            {
                                loading
                                    ? mode === "add" ? "Submitting.." : "Updating..."
                                    : mode === "add" ? "Submit" : "Update"
                            }
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AddProject