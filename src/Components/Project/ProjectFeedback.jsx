import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Delete, Edit, Heart, MessageSquare, PlusCircle, SendHorizonal, ThumbsUp, Trash2, X } from 'lucide-react'
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { requestMagicLink } from '../../Store/authSlice';
import { deleteFeedback, editFeedback, fetchFeedbacks, likeFeedback, postFeedback } from '../../Store/feedbackSlice';
import { useStateContext } from '../../Context/StateContext';

const EmptyState = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center custom-transparent py-4'>
            <div className='es-icon custom-transparent rounded-circle border border-secondary d-flex justify-content-center align-items-center position-relative' style={{ width: 96, height: 96 }}>
                <MessageSquare className='msg' size={48} />
                <PlusCircle size={24} className='plus position-absolute rounded-circle' style={{ bottom: 0, right: 0 }} />
            </div>
            <h3 className='mt-3'>No Feedback yet</h3>

            <p className='text-center mx-3'>Be the first to provide feedback for this project. Your insights and suggestions are valuable!</p>
        </div>
    )
}

const Loader = () => {
    const shapes = useMemo(() => ["square", "pentagon", "diamond", "cross", "octagon"], []);
    const [currentShape, setCurrentShape] = useState(0);
    const [animationCycle, setAnimationCycle] = useState(0);
    const SPEED = useRef(1.5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentShape(prev => (prev + 1) % shapes.length);
        }, 600 * SPEED.current);

        return () => clearInterval(interval);
    }, [shapes.length]);

    // Reset animation cycle every 3 seconds
    useEffect(() => {
        const waveInterval = setInterval(() => {
            setAnimationCycle(prev => prev + 1);
        }, 3000);

        return () => clearInterval(waveInterval);
    }, []);

    const textChars = useMemo(() => "Loading Feedbacks".split(""), []);

    // Single animation sequence for text wave
    const textContainer = {
        animate: {
            transition: {
                staggerChildren: 0.08,
                repeat: Infinity,
                repeatDelay: 1.5,
            }
        }
    };

    const letterAnimation = {
        initial: {
            y: 0,
            color: "#7a7a7a"
        },
        animate: {
            y: [0, -4, 0],
            color: ["#7a7a7a", "#ffffff", "#7a7a7a"],
            transition: {
                duration: 0.6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1.5
            }
        }
    };

    // Dot animation - starts after text wave completes
    const dotAnimation = (index) => ({
        initial: {
            y: 0,
            color: "#7a7a7a",
            opacity: 0.6
        },
        animate: {
            y: [0, -8, 0],
            color: ["#7a7a7a", "#ffffff", "#7a7a7a"],
            opacity: [0.6, 1, 0.6],
            transition: {
                duration: 0.8,
                delay: 1.92 + (index * 0.15), // Total text animation time = 16 chars * 0.08 = 1.28s + buffer
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1.5 - (index * 0.15) // Adjust to sync with text
            }
        }
    });

    return (
        <div className="custom-transparent d-flex flex-column justify-content-center align-items-center p-4">
            <div className='token-verification-container custom-transparent'>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={shapes[currentShape]}
                        initial={{
                            opacity: 0,
                            x: "20%",
                            y: "-50%",
                            rotate: -90,
                            scale: .85
                        }}
                        animate={{
                            opacity: 1,
                            x: "-50%",
                            y: "-50%",
                            rotate: 90,
                            scale: 1,
                            backgroundColor: ["#9f9f9f", "#7a7a7a", "#c0c0c0", "#9f9f9f"],
                            transition: {
                                x: { duration: 0.4, ease: "easeOut" },
                                opacity: { duration: 0.3 },
                                rotate: {
                                    repeat: Infinity,
                                    duration: 1.5 * SPEED.current,
                                    ease: "linear"
                                },
                                backgroundColor: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }
                        }}
                        exit={{
                            opacity: 0,
                            x: "-100%",
                            y: "-50%",
                            rotate: 90,
                            scale: .85,
                            transition: { duration: 0.25, ease: "easeIn" }
                        }}
                        className={`shape ${shapes[currentShape]} custom-transparent`}
                    />
                </AnimatePresence>
            </div>

            <div className="text-center mt-4 custom-transparent">
                <motion.div
                    className="fs-3 fw-bold d-inline-block custom-transparent"
                    key={animationCycle}
                    variants={textContainer}
                    initial="initial"
                    animate="animate"
                >
                    {textChars.map((char, i) => (
                        <motion.span
                            key={`${animationCycle}-${i}`}
                            variants={letterAnimation}
                            style={{
                                display: "inline-block",
                                marginRight: char === " " ? "4px" : "0"
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                <span className="fs-3 fw-bold ms-2" style={{ letterSpacing: "2px" }}>
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={`dot-${animationCycle}-${i}`}
                            initial="initial"
                            animate="animate"
                            variants={dotAnimation(i)}
                            style={{
                                display: "inline-block",
                            }}
                        >
                            .
                        </motion.span>
                    ))}
                </span>
            </div>
        </div>
    );
};


const AddCommentatorForm = ({ onClose, dispatch, loading, Toast, error }) => {
    const initialValues = {
        name: "",
        email: ""
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
    })

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await dispatch(requestMagicLink(values))
            if (requestMagicLink.fulfilled.match(res)) {
                Toast.success(
                    "Email Sent",
                    "Verification link has been sent to your email"
                )
            }
            if (requestMagicLink.rejected.match(res)) {
                Toast.error(
                    "Email Failed",
                    error
                )
            }
        } finally {
            setSubmitting(false);
            resetForm();
            onClose();

        }
    }

    return (
        <div className='container-fluid custom-transparent mt-4'>
            <p className='text-center mb-1'>
                Your name and email are required to submit feedback. They will be used only for follow-up or notification purposes.
            </p>
            <p className='text-center m-0'>
                <em>Don’t worry—your feedback has already been saved, and you won’t need to enter it again.</em>
            </p>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                className="custom-transparent"
            >
                <Form className='custom-transparent'>
                    <div className="row custom-transparent">
                        <div className="form-field custom-transparent mb-3 col-12">
                            <label htmlFor="name" className="form-label fw-semibold">Name <span>*</span></label>
                            <Field type="text" name="name" id="name" />
                            <ErrorMessage name="name" component="p" className="text-danger" />
                        </div>
                    </div>
                    <div className="row custom-transparent">
                        <div className="form-field custom-transparent mb-3 col-12">
                            <label htmlFor="email" className="form-label fw-semibold">Email <span>*</span></label>
                            <Field type="text" name="email" id="email" />
                            <ErrorMessage name="email" component="p" className="text-danger" />
                        </div>
                    </div>

                    <div className='d-flex justify-content-end align-items-center gap-2 mt-3 custom-transparent'>
                        <motion.button whileHover={{ y: -3 }} whileTap={{ scale: .95 }} className='project-close-btn rounded px-3 py-1' onClick={onClose}>Cancel</motion.button>
                        <motion.button whileHover={{ y: -3 }} whileTap={{ scale: .95 }} type="submit" className='project-submit-btn rounded px-3 py-1' disabled={loading} >
                            {
                                loading
                                    ? "Sending..."
                                    : "Send Verification Link"
                            }
                        </motion.button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

const FeedbackList = ({
    feedback,
    editMode,
    setEditMode,
    editFeedbackTxt,
    setEditFeedbackTxt,
    isAuthenticated,
    isLiked,
    isUserFeedback,
    handleEditFeedback,
    handleDelete,
    handleLike,
    formatTime
}) => {

    const userProfile = (name = "") => {
        const safeName = name.trim();

        if (!safeName) return null;

        const initials = safeName
            .split(/\s+/)
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

        return (
            <div
                className='user-profile rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'
                style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#2b2b2b',
                    border: '1px solid #7c7b7b2a'
                }}
            >
                <span
                    className='text-white fw-bold'
                    style={{ fontSize: '0.9rem' }}
                >
                    {initials}
                </span>
            </div>
        );
    };

    return (
        <div
            className='feedback-item custom-transparent p-3 mb-3 rounded d-flex flex-column flex-md-row align-items-start gap-3'
            style={{
                border: '1px solid #7c7b7b2a',
                backgroundColor: '#1c1c1c'
            }}
        >
            {/* Profile picture - hidden on small screens, visible on medium+ */}
            <div className='custom-transparent d-none d-md-block'>
                {userProfile(feedback.createdBy.name)}
            </div>

            <div className='custom-transparent w-100'>
                {/* Header with name and timestamp */}
                <div className='d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 custom-transparent gap-2'>
                    <div className='custom-transparent d-flex align-items-center gap-2 w-100 w-sm-auto'>
                        {/* Profile picture for mobile */}
                        <div className='custom-transparent d-md-none'>
                            {userProfile(feedback.createdBy.name)}
                        </div>

                        <div className='custom-transparent d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2'>
                            <strong className='text-white' style={{ fontSize: '1rem' }}>
                                {feedback.createdBy.name}
                            </strong>
                            {feedback?.contentUpdatedAt && (
                                <span
                                    className="badge align-self-start align-self-sm-center"
                                    style={{
                                        backgroundColor: '#2b2b2b',
                                        color: '#858585',
                                        fontSize: '0.7rem',
                                        padding: '2px 6px',
                                        whiteSpace: 'nowrap'
                                    }}
                                    title={`Edited on ${new Date(feedback.contentUpdatedAt).toLocaleString()}`}
                                >
                                    edited
                                </span>
                            )}
                        </div>
                    </div>
                    <span
                        className='custom-text text-end text-sm-start'
                        style={{
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {formatTime(feedback.createdAt)}
                    </span>
                </div>

                {/* Feedback content */}
                {editMode === feedback?._id ? (
                    <div className="custom-transparent mb-3">
                        <textarea
                            value={editFeedbackTxt}
                            onChange={(e) => setEditFeedbackTxt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleEditFeedback(feedback)
                                } else if (e.key === "Escape") {
                                    setEditMode(null)
                                }
                            }}
                            autoFocus
                            className='form-input w-100 p-2'
                            style={{
                                color: "#f1f1f1",
                                backgroundColor: '#171717',
                                borderRadius: '6px',
                                border: '1px solid #7c7b7b',
                                minHeight: '80px',
                                resize: 'vertical'
                            }}
                        />
                        <div className='d-flex gap-2 mt-2 justify-content-end flex-wrap'>
                            <button
                                onClick={() => { setEditMode(null); setEditFeedbackTxt("") }}
                                className='project-close-btn py-1 px-3 rounded d-flex align-items-center gap-1'
                                style={{ fontSize: '0.9rem' }}
                            >
                                <X size={16} />
                                <span className='d-none d-sm-inline'>Cancel</span>
                            </button>
                            <button
                                onClick={() => { handleEditFeedback(feedback) }}
                                className='project-submit-btn py-1 px-3 rounded d-flex align-items-center gap-1'
                                style={{ fontSize: '0.9rem' }}
                            >
                                <Check size={16} />
                                <span className='d-none d-sm-inline'>Save</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <p
                        className='text-break mb-3'
                        style={{
                            color: '#d0d0d0',
                            lineHeight: '1.5',
                            fontSize: '0.95rem'
                        }}
                    >
                        {feedback.feedback}
                    </p>
                )}

                {/* Actions */}
                <div className='d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center gap-2 mt-3 pt-2 custom-transparent'
                    style={{ borderTop: '1px solid #7c7b7b2a' }}>

                    {/* Like button */}
                    <button
                        onClick={() => handleLike(feedback._id)}
                        className={`cursor-pointer d-flex align-items-center justify-content-center gap-2 py-2 py-sm-1 px-3 rounded ${isAuthenticated && isLiked() ? 'like-btn-active' : 'like-btn'}`}
                        title={`${isLiked() ? "Remove helpful vote" : "Mark as helpful"}`}
                        style={{
                            width: '100%',
                            minHeight: '40px'
                        }}
                    >
                        <ThumbsUp size={16} />
                        <span className='text-nowrap'>
                            Helpful <strong>({feedback.likedBy.length})</strong>
                        </span>
                    </button>

                    {/* Edit/Delete actions (for owner) */}
                    {isAuthenticated && isUserFeedback() && editMode !== feedback._id && (
                        <div className='d-flex align-items-stretch gap-1 custom-transparent w-100 w-sm-auto'>
                            <button
                                onClick={() => {
                                    setEditMode(feedback._id)
                                    setEditFeedbackTxt(feedback.feedback)
                                }}
                                className='cursor-pointer d-flex align-items-center justify-content-center gap-1 py-2 py-sm-1 px-3 rounded feedback-edit-btn flex-grow-1'
                                title='Edit Feedback'
                                style={{ minHeight: '40px' }}
                            >
                                <Edit size={16} />
                                <span className='d-none d-sm-inline'>Edit</span>
                            </button>

                            <button
                                onClick={() => handleDelete(feedback._id)}
                                className='cursor-pointer d-flex align-items-center justify-content-center gap-1 py-2 py-sm-1 px-3 rounded feedback-delete-btn flex-grow-1'
                                title='Delete Feedback'
                                disabled={editMode}
                                style={{ minHeight: '40px' }}
                            >
                                <Trash2 size={16} />
                                <span className='d-none d-sm-inline'>Delete</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const ProjectFeedback = ({ isRight, project, isClosing }) => {
    const { user, isAuthenticated, loading: authLoading, mailLoading, error: authError } = useSelector(state => state.auth)
    const { list: feedbacks, loading: feedbackLoading, error: feedbackError } = useSelector(state => state.feedbacks)
    const { Toast } = useStateContext();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFeedbacks(project._id))
    }, [project])

    // const [feedbacks, setFeedbacks] = useState([])
    const [addCommentator, setAddCommentator] = useState(false);
    const [editMode, setEditMode] = useState(null)
    const [editFeedbackTxt, setEditFeedbackTxt] = useState("")
    const [sortMode, setSortMode] = useState("latest")

    const sortedFeedbacks = [...feedbacks].sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)

        return sortMode === "latest" ? dateB - dateA : dateA - dateB
    })

    const formatTime = (timestamp) => {
        const now = new Date();
        const date = new Date(timestamp);
        return now - date < 24 * 60 * 60 * 1000
            ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : date.toLocaleDateString();
    }

    const initialValues = {
        comment: ""
    }

    const validationSchema = Yup.object().shape({
        comment: Yup.string().required("Comment is required"),
    })

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            if (isAuthenticated) {
                const payload = {
                    feedback: values.comment,
                    userId: user._id,
                    projectId: project._id
                }

                const res = await dispatch(postFeedback(payload))
                if (postFeedback.fulfilled.match(res)) {
                    Toast.success(
                        "Posted",
                        "Feedback posted successfully"
                    )
                }
                if (postFeedback.rejected.match(res)) {
                    Toast.error(
                        "Failed",
                        feedbackError
                    )
                }

            } else {
                localStorage.setItem("pendingFeedback", JSON.stringify({
                    feedback: values.comment,
                    projectId: project._id
                }))
                Toast.error("Unauthenticated")
                setAddCommentator(true)
            }
        } finally {
            setSubmitting(false);
            resetForm();
        }
    }

    const handleEditFeedback = async (feedback) => {
        try {
            if (feedback.feedback === editFeedbackTxt) {
                Toast.info("Nothing to update", "Your feedback hasn’t changed")
                return null
            }
            const payload = {
                feedback: editFeedbackTxt,
                feedbackId: feedback._id,
                userId: user._id
            }
            const res = await dispatch(editFeedback(payload))
            if (editFeedback.fulfilled.match(res)) {
                Toast.success(
                    "Updated",
                    "Feedback updated successfully"
                )
            }
            if (editFeedback.rejected.match(res)) {
                Toast.error(
                    "Update Failed",
                    feedbackError
                )
            }
        } finally {
            setEditMode(null)
        }
    }

    const handleLike = async (feedbackId) => {
        if (isAuthenticated) {
            const payload = { feedbackId, userId: user._id }
            await dispatch(likeFeedback(payload))
        } else {
            Toast.error("Unauthenticated")
            setAddCommentator(true)
        }
    }

    const handleDelete = async (feedbackId) => {
        try {
            const res = await dispatch(deleteFeedback(feedbackId))
            if (deleteFeedback.fulfilled.match(res)) {
                Toast.success(
                    "Deleted",
                    "Feedback removed successfully"
                )
            }
            if (deleteFeedback.rejected.match(res)) {
                Toast.error(
                    "Delete Failed",
                    feedbackError
                )
            }
        } finally {

        }
    }

    return (
        <motion.div
            key={"Project-Feedbacks"}
            initial={{ x: isRight ? -700 : 700 }}
            animate={{ x: isClosing ? (isRight ? -700 : 700) : 0 }}
            transition={{ duration: .3, ease: "easeInOut" }}
            className={`project-feedback rounded p-3`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className='feedback-header custom-transparent pb-1 border-bottom border-secondary'>
                <h2 className='fw-bold text-white'>Feedback for {project.title}</h2>
            </div>

            {feedbackLoading ? <>
                <Loader />
            </> : <>
                {!addCommentator && <div className="custom-transparent">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        className="custom-transparent"
                    >
                        <Form className='custom-transparent'>
                            <div className="feedback-form-field custom-transparent mt-3 position-relative">
                                <Field
                                    as="textarea"
                                    name="comment"
                                    id="comment"
                                    placeholder={`Write your feedback ${user?.name ? `as ${user.name}...` : "here..."}`}
                                    className="w-100 p-2"
                                    rows={1}
                                />
                                <button className='feedback-submit-btn d-flex justify-content-center align-items-center position-absolute top-0 end-0' type="submit">
                                    <SendHorizonal size={22} />
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    {feedbacks.length > 0 && <div className='custom-transparent d-flex justify-content-start align-items-center gap-2 my-2'>
                        <div className={"custom-transparent cursor-pointer sort-btn rounded px-3 py-1 mb-1" + ` ${sortMode === "latest" ? "sort-btn-active" : ""}`} onClick={() => setSortMode("latest")}>Latest</div>
                        <div className={"custom-transparent cursor-pointer  rounded px-3 py-1 mb-1" + ` ${sortMode === "oldest" ? "sort-btn-active" : ""}`} onClick={() => setSortMode("oldest")}>Oldest</div>
                    </div>}
                </div>}

                <AnimatePresence>
                    {
                        addCommentator ?
                            <AddCommentatorForm
                                onClose={() => setAddCommentator(false)}
                                dispatch={dispatch}
                                loading={mailLoading}
                                Toast={Toast}
                                error={authError}
                            />
                            : <>
                                {sortedFeedbacks.length === 0 ?
                                    <EmptyState />
                                    : <>
                                        {sortedFeedbacks.map((feedback, i) => {
                                            const isLiked = () => { if (isAuthenticated) return feedback?.likedBy.includes(user._id) };
                                            const isUserFeedback = () => { if (isAuthenticated) return feedback?.createdBy._id === user._id };
                                            return (
                                                <FeedbackList
                                                    feedback={feedback}
                                                    editFeedbackTxt={editFeedbackTxt}
                                                    setEditFeedbackTxt={setEditFeedbackTxt}
                                                    editMode={editMode}
                                                    setEditMode={setEditMode}
                                                    isAuthenticated={isAuthenticated}
                                                    isLiked={isLiked}
                                                    isUserFeedback={isUserFeedback}
                                                    handleEditFeedback={handleEditFeedback}
                                                    handleDelete={handleDelete}
                                                    handleLike={handleLike}
                                                    formatTime={formatTime}
                                                    key={i}
                                                />

                                            )
                                        })}
                                    </>
                                }
                            </>
                    }
                </AnimatePresence>
            </>}
        </motion.div>
    )
}

export default ProjectFeedback