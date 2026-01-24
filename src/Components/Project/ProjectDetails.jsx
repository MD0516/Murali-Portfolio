import { useStateContext } from '../../Context/StateContext'
import { motion, AnimatePresence } from "framer-motion"
import { X } from 'lucide-react'
import ProjectFeedback from './ProjectFeedback';
import ProjectDetailsCard from './ProjectDetailsCard';
import { useState } from 'react';

const ProjectDetails = ({ project, onClose }) => {
    const { isMobile } = useStateContext()
    const ifLeft = project.index % 2 === 0;

    const [isClosing, setIsClosing] = useState(false)

    const handleClose = () => {
        setIsClosing(true)
    }
    return (
        <motion.div
            key={"project-details-blur"}
            initial={{ y: isMobile ? -400 : -1100 }}
            animate={{ y: isClosing ? (isMobile ? -400 : -1100) : 0 }}
            onAnimationComplete={() => { if (isClosing) onClose() }}
            transition={{ duration: .3, ease: "easeInOut" }}
            className={'custom-blur-full'} onClick={handleClose}
        >
            <AnimatePresence mode='sync'>
                <motion.div
                    key={project._id}
                    initial={false}
                    exit={"exit"}
                    className={`${!ifLeft && !isMobile ? " right-project" : ""} d-flex flex-column flex-md-row justify-content-md-around p-4 gap-3 w-100 custom-transparent overlay-cards`}
                >
                    <ProjectDetailsCard isLeft={ifLeft} project={project} isClosing={isClosing} />
                    <ProjectFeedback isRight={!ifLeft} project={project} isClosing={isClosing} />
                </motion.div>
            </AnimatePresence>
            <X size={30} className='custom-transparent position-fixed top-0 end-0 m-3 custom-blur-close' onClick={onClose} color='white' />
        </motion.div>
    )
}

export default ProjectDetails