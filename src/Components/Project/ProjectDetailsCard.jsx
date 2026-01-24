import { motion } from 'framer-motion';
import { Github, Link, Lock } from 'lucide-react';

const ProjectDetailsCard = ({ project, isLeft, isClosing }) => {
    const renderTechStack = () => (
        <div className="custom-transparent mb-4">
            <div className="custom-transparent d-flex align-items-center gap-2 mb-2">
                <strong className='fs-4 fw-semibold text-white'>Tech Stack</strong>
                <div className="flex-grow-1" style={{ height: '1px', backgroundColor: '#7c7b7b2a' }}></div>
            </div>
            <div className="custom-transparent tech-stack d-flex flex-wrap gap-2 custom-transparent">
                {project.technologies.map((tech, index) => (
                    <span
                        className='tech-name fw-medium rounded px-3 py-2'
                        key={`tech-${index}`}
                        style={{
                            backgroundColor: '#2b2b2b',
                            border: '1px solid #7c7b7b2a',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );

    const renderListItems = (items, keyPrefix) => (
        <ul className='mt-3 mb-3 ps-3' style={{ listStyleType: 'none' }}>
            {items.map((item, index) => (
                <li
                    key={`${keyPrefix}-${index}`}
                    className='mb-2 d-flex align-items-start'
                    style={{ color: '#d0d0d0' }}
                >
                    <span className='me-2' style={{ color: '#7c7b7b' }}>•</span>
                    <span style={{ lineHeight: '1.5' }}>{item}</span>
                </li>
            ))}
        </ul>
    );

    const renderRoleAndOrganization = () => (
        <div className='custom-transparent mb-4'>
            <div className="custom-transparent row g-3">
                <div className='custom-transparent col-12 col-md-6'>
                    <div className='custom-transparent p-3 rounded' style={{ backgroundColor: '#1c1c1c', border: '1px solid #7c7b7b2a' }}>
                        <strong className='fs-5 fw-semibold d-block mb-2 text-white'>My Role</strong>
                        <p className='mb-0' style={{ color: '#d0d0d0', lineHeight: '1.5' }}>{project.my_role}</p>
                    </div>
                </div>
                {project.organization && (
                    <div className='custom-transparent col-12 col-md-6'>
                        <div className='custom-transparent p-3 rounded' style={{ backgroundColor: '#1c1c1c', border: '1px solid #7c7b7b2a' }}>
                            <strong className='fs-5 fw-semibold d-block mb-2 text-white'>Built For</strong>
                            <p className='mb-0' style={{ color: '#d0d0d0', lineHeight: '1.5' }}>{project.organization}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderLiveLinks = () => {
        const hasLiveLink = project.link && project.link !== "null";
        const hasRepoLink = project.repo_link && project.repo_mode !== "private";

        if (!hasLiveLink && !hasRepoLink) {
            return (
                <div className="custom-transparent">
                    <div className="custom-transparent text-center p-3 rounded" style={{ backgroundColor: '#2b2b2b', border: '1px solid #7c7b7b2a' }}>
                        <Lock size={24} className="mb-2" style={{ color: '#7c7b7b' }} />
                        <p className="mb-0" style={{ color: '#858585' }}>
                            Live links not available. Contact for demo access.
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className={`custom-transparent`}>
                <div className="custom-transparent d-flex align-items-center gap-2 mb-3">
                    <strong className='fs-4 fw-semibold text-white'>Live Links</strong>
                    <div className="flex-grow-1" style={{ height: '1px', backgroundColor: '#7c7b7b2a' }}></div>
                </div>
                <div className="d-flex flex-wrap gap-3 custom-transparent project-link">
                    {hasLiveLink && (
                        <motion.a
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none rounded px-4 py-3 d-flex align-items-center gap-2 flex-grow-1"
                        >
                            <Link size={18} />
                            <span className="fw-medium">Visit Live Site</span>
                        </motion.a>
                    )}

                    {hasRepoLink && (
                        <motion.a
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.repo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none rounded px-4 py-3 d-flex align-items-center gap-2 flex-grow-1"
                        >
                            <Github size={18} />
                            <span className="fw-medium">View Source Code</span>
                        </motion.a>
                    )}

                    {project.repo_mode === "private" && (
                        <div
                            className="rounded px-4 py-3 d-flex align-items-center gap-2 flex-grow-1"
                            style={{
                                backgroundColor: '#1c1c1c',
                                border: '1px solid #7c7b7b2a',
                                color: '#858585',
                                minWidth: '200px',
                                cursor: 'not-allowed'
                            }}
                            title="Repository is private"
                        >
                            <Lock size={18} />
                            <span className="fw-medium">Private Repo</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderSection = (title, content, contentRenderer = null) => (
        <div className='custom-transparent mb-4'>
            <div className="custom-transparent d-flex align-items-center gap-2 mb-3">
                <strong className='fs-4 fw-semibold text-white'>{title}</strong>
                <div className="flex-grow-1 m-0 p-0" style={{ height: '1px', backgroundColor: '#7c7b7b2a' }}></div>
            </div>
            {contentRenderer ? contentRenderer() : content}
        </div>
    );

    return (
        <motion.div
            key={"Project-Details"}
            initial={{ x: isLeft ? -700 : 700 }}
            animate={{ x: isClosing ? (isLeft ? -700 : 700) : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`project-view-card rounded p-3 p-md-4`}
            onClick={(e) => e.stopPropagation()}
            style={{
                maxHeight: '90vh',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: '#858585 transparent'
            }}
        >
            {/* Header */}
            <div className="custom-transparent pb-3 border-bottom mb-3" style={{ borderColor: '#7c7b7b2a' }}>
                <h2 className='display-5 fw-bold mb-2 text-white'>{project.title}</h2>
                {project.subtitle && (
                    <p className='mb-0' style={{ color: '#858585', fontSize: '1.1rem' }}>
                        {project.subtitle}
                    </p>
                )}
            </div>

            {/* Content */}
            <div className="project-view-content custom-transparent pt-2">
                {/* Project Overview */}
                {renderSection("Project Overview",
                    <p className='mb-0' style={{
                        textAlign: "justify",
                        color: '#d0d0d0',
                        lineHeight: '1.6',
                        fontSize: '1.05rem'
                    }}>{project.description}</p>
                )}

                {/* Tech Stack */}
                {renderTechStack()}

                {/* Key Features */}
                {renderSection("Key Features", null, () => renderListItems(project.key_features, 'feature'))}

                {/* Role and Organization */}
                {renderRoleAndOrganization()}

                {/* What I Learned */}
                {renderSection("What I Learned", null, () => renderListItems(project.what_i_learned, 'learned'))}

                {/* Repository Info */}
                {renderLiveLinks()}
            </div>
        </motion.div>
    );
}

export default ProjectDetailsCard