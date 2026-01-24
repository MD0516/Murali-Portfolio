import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { CheckCircle2, Info, Loader2, XCircle } from 'lucide-react'
import { motion } from "framer-motion"
import { useStateContext } from '../../Context/StateContext'

const VARIANTS = {
  success: {
    icon: CheckCircle2,
    color: "#22c55e",
    bgColor: "#1c1c1c",
    borderColor: "#22c55e33",
    ariaLabel: "Success notification"
  },
  info: {
    icon: Info,
    color: "#858585",
    bgColor: "#1c1c1c",
    borderColor: "#333",
    ariaLabel: "Information notification"
  },
  error: {
    icon: XCircle,
    color: "#ef4444",
    bgColor: "#1c1c1c",
    borderColor: "#ef444433",
    ariaLabel: "Error notification"
  },
  loading: {
    icon: Loader2,
    color: "#858585",
    bgColor: "#1c1c1c",
    borderColor: "#7c7b7b2a",
    ariaLabel: "Loading notification"
  }
}

const HelperToast = ({
  title,
  message,
  delay = 0,
  type = "info",
  duration = 3000,
  id
}) => {

  const { Toast } = useStateContext()
  const [activeVariant, setActiveVariant] = useState(VARIANTS.info)
  const [prevType, setPrevType] = useState(type)

  useEffect(() => {
    if (VARIANTS[type]) {
      setActiveVariant(VARIANTS[type])
    }
    setPrevType(type)
  }, [type])

  const durationInSeconds = useMemo(() => duration / 1000, [duration])
  const isLoading = type === "loading";

  const toastVariants = useMemo(() => ({
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }), [delay])

  const progressVariants = useMemo(() => ({
    initial: { width: "100%" },
    animate: {
      width: 0,
      transition: {
        duration: durationInSeconds,
        ease: "linear",
        delay
      }
    }
  }), [durationInSeconds, delay])

  const getAriaLive = useCallback(() => {
    switch (type) {
      case 'error': return 'assertive'
      case 'success':
      case 'info':
      default: return 'polite'
    }
  }, [type])

  const toastId = useMemo(() => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, [])
  const titleId = `${toastId}-title`
  const messageId = `${toastId}-message`

  const Icon = activeVariant.icon

  return (
    <motion.div
      layout
      layoutId={toastId}
      initial={{ opacity: 0, x: 50, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mb-3 custom-transparent"
      style={{
        width: '380px',
        height: 'auto',
      }}
      role="region"
      aria-label="Notification area"
      onAuxClick={(e) => {
        if (e.button === 1) {
          Toast.dismiss(id)
        }
      }}
    >
      <motion.div
        variants={toastVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="position-relative custom-transparent"
        style={{
          backgroundColor: activeVariant.bgColor,
          border: `1px solid ${activeVariant.borderColor}`,
          borderRadius: '7px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          minHeight: '80px',
          width: '100%',
        }}
        aria-live={getAriaLive()}
        role="alert"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        tabIndex={-1}
      >
        <div className='d-flex align-items-start custom-transparent p-3 gap-3'
          style={{
            minHeight: '78px',
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center custom-transparent"
            style={{
              width: "32px",
              height: "32px",
              flexShrink: 0
            }}
            aria-hidden="true"
          >
            {!isLoading ? (
              <Icon
                size={28}
                color={activeVariant.color}
                className='m-0'
                aria-hidden="true"
              />
            ) : (
              <Loader2
                size={28}
                color={activeVariant.color}
                className='m-0 loading-spinner'
                aria-hidden="true"
                style={{
                  animation: 'spin 1s linear infinite'
                }}
              />
            )}
          </div>

          <div
            className="custom-transparent"
            style={{
              flex: 1,
              minWidth: 0,
              maxWidth: 'calc(100% - 84px)',
            }}
          >
            {title && (
              <p
                className="m-0 fw-semibold text-truncate"
                style={{
                  color: type === 'error' ? '#ef4444' : '#ffffff',
                  fontSize: '1rem',
                  lineHeight: '1.4'
                }}
                id={titleId}
              >
                {title}
              </p>
            )}
            {message && (
              <p
                className="m-0 mt-1 text-break"
                style={{
                  color: '#858585',
                  fontSize: "0.9rem",
                  lineHeight: 1.4,
                  wordBreak: 'break-word',
                  maxHeight: '48px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}
                id={messageId}
              >
                {message}
              </p>
            )}
          </div>

          <button
            className="custom-close-btn p-1"
            onClick={() => Toast.dismiss(id)}
            aria-label="Close notification"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#858585',
              cursor: 'pointer',
              flexShrink: 0,
              marginTop: '-2px'
            }}
          >
            <XCircle size={20} />
          </button>
        </div>

        {!isLoading && (
          <motion.div
            variants={progressVariants}
            initial="initial"
            animate="animate"
            className="position-absolute bottom-0 start-0"
            style={{
              height: '2px',
              backgroundColor: activeVariant.color,
              opacity: 0.5,
              borderRadius: '0 0 7px 7px'
            }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default React.memo(HelperToast)