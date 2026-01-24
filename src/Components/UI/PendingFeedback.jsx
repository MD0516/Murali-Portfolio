import React from 'react'
import { X } from 'lucide-react'
import { useStateContext } from '../../Context/StateContext'
import { useDispatch } from 'react-redux'
import { postFeedback } from '../../Store/feedbackSlice'

const PendingFeedback = ({ pendingFeedback, projects, onClose, user, error }) => {
  if (!pendingFeedback) return null;

  const { Toast } = useStateContext();
  const dispatch = useDispatch();
  const project = projects.find(p => p._id === pendingFeedback.projectId)

  const handlePostFeedback = async () => {
    const payload = {
      feedback: pendingFeedback.feedback,
      userId: user._id,
      projectId: project._id
    }

    const res = await dispatch(postFeedback(payload))
    if (postFeedback.fulfilled.match(res)) {
      Toast.success(
        "Posted",
        "Feedback posted successfully"
      )
      localStorage.removeItem("pendingFeedback")
    }
    if (postFeedback.rejected.match(res)) {
      Toast.error(
        "Failed",
        error
      )
    }
  }

  return (
    <div className="custom-blur-full " onClick={onClose} >
      <X color='#fff' size={26} className='position-fixed cursor-pointer' style={{ top: 10, right: 10 }} />
      <div className='d-flex align-items-center justify-content-center w-100 h-100 custom-transparent' >
        <div className='p-4 rounded feedback-pending-container d-flex flex-column gap-2' onClick={(e) => e.stopPropagation()}>
          <h2>Post Feedback — {project.title}</h2>
          <div className='d-flex justify-content-center align-items-center fs-5'>
            <p className='fw-semibold'>"{pendingFeedback.feedback}"</p>
          </div>
          <p className='text-center fw-bold fs-5'>Do you want to post this feedback?</p>
          <div className='custom-transparent cursor-pointer sort-btn rounded px-3 py-1 mx-auto text-center fw-semibold' style={{ width: "40%" }} onClick={handlePostFeedback}>
            Post Feedback
          </div>
          <em className='mt-3 text-center fs-6'>
            If you have already posted this feedback, you can safely close this modal. <br />
            Closing this modal will permanently discard the pending feedback.
          </em>
        </div>
      </div>
    </div>
  )
}

export default PendingFeedback