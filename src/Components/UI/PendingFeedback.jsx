import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useStateContext } from '../../Context/StateContext'
import { useDispatch } from 'react-redux'
import { postFeedback } from '../../Store/feedbackSlice'
import { deletePendingFeedbacks } from '../../Store/pendingFeedbackSlice'

const PendingFeedback = ({ pendingFeedbacks, onClose, user, error }) => {
  if (!Array.isArray(pendingFeedbacks) || pendingFeedbacks.length === 0) return null;

  const { Toast } = useStateContext();
  const dispatch = useDispatch();

  const [isMultiple, setIsMultiple] = useState(false)

  const handlePostFeedback = async (feedback) => {
    const payload = {
      feedback: feedback.feedbackText,
      userId: user._id,
      projectId: feedback.project._id
    }

    const res = await dispatch(postFeedback(payload))
    if (postFeedback.fulfilled.match(res)) {
      Toast.success(
        "Posted",
        "Feedback posted successfully"
      )
      await dispatch(deletePendingFeedbacks(feedback._id))
    }
    if (postFeedback.rejected.match(res)) {
      Toast.error(
        "Failed",
        error
      )
    }
  }

  const handleClose = async () => {
    const promises = pendingFeedbacks.map(feedback =>
      dispatch(deletePendingFeedbacks(feedback._id))
    )
    await Promise.all(promises)
    onClose()
  }

  useEffect(() => {
    if (pendingFeedbacks.length > 1) {
      setIsMultiple(true)
    } else {
      setIsMultiple(false)
    }
  }, [handlePostFeedback])

  return (
    <div className="custom-blur-full " onClick={() => handleClose()} >
      <X color='#fff' size={26} className='position-fixed cursor-pointer' style={{ top: 10, right: 10 }} />
      <div className='d-flex align-items-center justify-content-center w-100 h-100 custom-transparent' >
        <div className='p-4 rounded feedback-pending-container d-flex flex-column gap-2' onClick={(e) => e.stopPropagation()}>
          <div className={`d-flex flex-column gap-4 ${isMultiple > 0 ? "pending-feedback-overflow" : ""}`}>
            {pendingFeedbacks.map((feedback) => (
              <div className='pending-feedback-card pb-4 mb-1 mx-3'>
                <h2>Confirm Feedback for {feedback.project.title}</h2>
                <div className='mt-3 d-flex justify-content-center align-items-center fs-5'>
                  <p className='fw-semibold'>"{feedback.feedbackText}"</p>
                </div>
                <p className='text-center fw-bold fs-5'>Post this feedback?</p>
                <div className='custom-transparent cursor-pointer sort-btn rounded px-3 py-1 mx-auto text-center fw-semibold' style={{ width: "100px" }} onClick={() => handlePostFeedback(feedback)}>
                  Post now
                </div>
              </div>
            ))}
          </div>
          <em className='mt-3 text-center fs-6'>
            If you’ve already posted any of these, you can safely close this window. <br />
            Closing this window will permanently discard all pending feedback.
          </em>
        </div>
      </div>
    </div>
  )
}

export default PendingFeedback