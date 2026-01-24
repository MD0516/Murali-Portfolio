import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectDetails from '../Components/Project/ProjectDetails'
import { Edit2, Inbox, Trash2, TriangleAlert } from 'lucide-react'
import { Badge } from 'react-bootstrap'
import AddProject from '../Components/Project/AddProject'
import { useStateContext } from '../Context/StateContext'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../Store/projectSlice'

const ProjectCard = React.memo(function ProjectCard({
    item,
    index,
    fromDir,
    isAdmin,
    onView,
    onEdit,
    onDelete,
    isClicked,
    viewProject,
    animateNow
}) {
    return (
        <div className='col-12 col-md-6' key={item._id}>
            {
                animateNow &&
                <motion.div
                    initial={{ opacity: 0, x: fromDir }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: 'easeInOut'
                    }}
                    viewport={{ once: true }}
                    className={'project-card position-relative'}
                    key={item._id}
                    onClick={onView}
                    title='View Details'
                >
                    {isClicked && viewProject._id === item._id && <div className='position-absolute project-card-hide'></div>}
                    <Badge className='position-absolute project-badge text-capitalize m-3 d-flex align-items-center justify-content-center px-2' style={{ zIndex: 90 }}>
                        {item.status.replace('_', ' ')}
                    </Badge>
                    {isAdmin &&
                        <>
                            <Badge
                                className='position-absolute project-badge-edit text-capitalize m-3 d-flex align-items-center justify-content-center py-2'
                                style={{ zIndex: 90 }}
                                onClick={(e) => onEdit(e)}
                            >
                                <Edit2 size={10} />
                            </Badge>
                            <Badge
                                className='position-absolute project-badge-delete text-capitalize m-3 d-flex align-items-center justify-content-center py-2'
                                style={{ zIndex: 90 }}
                                onClick={(e) => onDelete(e)}
                            >
                                <Trash2 size={10} />
                            </Badge>
                        </>
                    }
                    <div className='project-img d-flex align-items-center justify-content-center'>
                        <img src={item.image} alt={item.title} loading='lazy' />
                    </div>

                    <div className='project-description '>
                        <div className='project-title px-2 mb-3  custom-transparent'>
                            <h3 className=' custom-transparent'>{item.title}</h3>
                            <p className='short-desc m-0 custom-transparent'>{item.short_description}</p>
                        </div>

                        <div className='tech-stack d-flex flex-wrap gap-2 px-2 mb-1 custom-transparent'>
                            {
                                item.technologies.slice(0, 3).map((tech, t) => (
                                    <p className='tech-name fw-semibold rounded px-2' key={t}>
                                        {tech}
                                    </p>
                                ))
                            }
                            {
                                item.technologies.length > 3 && (
                                    <p className='tech-name fw-semibold rounded px-2'>
                                        +{item.technologies.length - 3} more
                                    </p>
                                )
                            }
                        </div>
                    </div>

                </motion.div>
            }
        </div>
    )
})

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

    const textChars = useMemo(() => "Loading Projects".split(""), []);

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
        <div className="d-flex flex-column justify-content-center align-items-center p-4">
            <div className='token-verification-container'>
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
                        className={`shape ${shapes[currentShape]}`}
                    />
                </AnimatePresence>
            </div>

            <div className="text-center mt-4">
                <motion.div
                    className="fs-3 fw-bold d-inline-block"
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

const ConfirmModal = ({ isOpen, onClose, project, dispatch }) => {
    if (!isOpen) return null

    const handleDelete = async (id) => {
        const res = await dispatch(deleteProject({ id }))
        if (deleteProject.fulfilled.match(res)) {
            Toast.success("Deleted", "Project deleted successfully")
        }
        if (deleteProject.rejected.match(res)) {
            Toast.error("Failed", error)
        }
    }

    return (
        <div className="custom-modal-overlay" onClick={onClose}>
            <div className="custom-alert-content" onClick={(e) => e.stopPropagation()}>
                <div className="custom-alert-header">
                    <button
                        type="button"
                        className="custom-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className='custom-alert-body text-center'>
                    <div className="custom-alert-icon">
                        <TriangleAlert color='red' size={100} />
                    </div>
                    <h5 className='custom-alert-title'>Are you sure you want to delete {project.title} ?</h5>
                    <button
                        className='custom-alert-button mt-3'
                        onClick={() => { handleDelete(project._id); onClose() }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

const Projects = () => {
    const { addProject, setAddProject, Toast } = useStateContext();
    const { list: projects, loading, error } = useSelector(state => state.projects)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const [isClicked, setIsClicked] = useState(false);
    const [viewProject, setViewProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)

    const [xDir, setXDir] = useState(window.innerWidth > 768 ? 200 : 13);
    const isAdmin = user?.role === "admin"

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

    useEffect(() => {
        if (isClicked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isClicked, viewProject]);

    const handleDelete = async (project) => {
        setSelectedProject(project)
        setOpenConfirmModal(true)
    }

    if (loading) {
        return (
            <Loader />
        )
    }

    const EmptyState = () => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .8, ease: 'easeInOut' }}
                viewport={{ once: true }}
                className='container-fluid py-2 custom-color-responsiveness d-flex flex-column justify-content-center align-items-center'
                style={{ height: "50vh" }}
            >
                <Inbox size={148} className='mb-3 text-white opacity-75' />
                <h3 className='text-white fw-bold'>No projects to display.</h3>
                <p className='text-center'>It seems there are no projects available at the moment. Please check back later for updates!</p>
            </motion.div>
        )
    }

    return (
        <div className='content-height'>
            {
                animateNow &&
                <motion.div
                    initial={{ opacity: 0, y: -400 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -400 }}
                    transition={{ duration: .8, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                    className="container-fluid py-2 custom-color-responsiveness"
                >
                    <h2 className='text-white fs-1 fw-bolder'>Projects</h2>
                    <p className='fw-semibold fs-5'>These are just the beginning — I'm continuously building and learning through hands-on development</p>
                </motion.div>
            }
            {
                projects && projects.length > 0 ?
                    <>
                        {
                            animateNow &&
                            <motion.div
                                initial={{ opacity: 0, y: 200 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 200 }}
                                transition={{ duration: .8, ease: 'easeInOut' }}
                                viewport={{ once: true }}
                                className='container-fluid py-2 custom-color-responsiveness position-relative'
                            >

                                <div className='row g-3'>
                                    {projects.map((item, i) => {
                                        const fromDir = i % 2 == 0 ? -xDir : xDir

                                        const onView = () => {
                                            setIsClicked(true)
                                            setViewProject({ ...item, index: i })
                                            localStorage.setItem("showToast", false)
                                        }

                                        const onEdit = (e) => {
                                            e.stopPropagation()
                                            setAddProject(true)
                                            setSelectedProject(item)
                                        }

                                        const onDelete = (e) => {
                                            e.stopPropagation()
                                            handleDelete(item)
                                        }

                                        return (
                                            <ProjectCard
                                                item={item}
                                                index={i}
                                                fromDir={fromDir}
                                                isAdmin={isAdmin}
                                                onDelete={onDelete}
                                                onEdit={onEdit}
                                                onView={onView}
                                                animateNow={animateNow}
                                                isClicked={isClicked}
                                                viewProject={viewProject}
                                                key={i}
                                            />
                                        )
                                    })}
                                </div>

                                <AnimatePresence mode='wait'>
                                    {
                                        isClicked &&
                                        <ProjectDetails
                                            project={viewProject}
                                            onClose={() => {
                                                setIsClicked(false);
                                                setViewProject(null)
                                            }}
                                        />
                                    }
                                </AnimatePresence>

                            </motion.div>
                        }
                    </> : <>
                        {
                            animateNow &&
                            <EmptyState />
                        }
                    </>
            }
            {
                addProject &&
                <AddProject
                    project={selectedProject}
                    onClose={() => {
                        setAddProject(false)
                        setSelectedProject(null)
                    }}
                />
            }
            {
                openConfirmModal &&
                <ConfirmModal
                    isOpen={openConfirmModal}
                    onClose={() => { setSelectedProject(null); setOpenConfirmModal(false) }}
                    project={selectedProject}
                    dispatch={dispatch}
                />
            }
        </div>
    )
}

export default Projects