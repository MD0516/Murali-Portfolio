import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyMagicLink } from '../Store/authSlice'
import { KeySquare } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

const EmptyState = ({ navigate }) => {
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center p-4">
            <div className="text-center p-5 rounded token-empty-container" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="mb-4">
                    <div className="d-inline-flex p-4 rounded-circle">
                        <KeySquare size={72} color="#8f8f8f" />
                    </div>
                </div>

                <h4 className="custom-text fw-semibold mb-3" style={{ color: '#8f8f8f' }}>
                    No Token Found
                </h4>

                <p className="mb-4 px-3" style={{ lineHeight: '1.6', color: "#8f8f8f" }}>
                    This verification link is missing or invalid.<br />
                    Please request a new sign-in link to continue.
                </p>

                <div className="mt-3">
                    <button
                        onClick={() => navigate("/")}
                        className="btn token-home-btn"
                        style={{ color: "#8f8f8f" }}
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

const VerificationLoader = () => {
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

    const textChars = useMemo(() => "Verifying Token".split(""), []);

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
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center p-4">
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

const Redirect = ({ navigate }) => {
    const [countdown, setCountdown] = useState(5);

    // Handle countdown and auto-redirect
    useEffect(() => {
        if (countdown <= 0) {
            navigate("/");
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, navigate]);

    // Auto-redirect after 5 seconds as fallback
    useEffect(() => {
        const autoRedirect = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => clearTimeout(autoRedirect);
    }, [navigate]);

    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center p-4 text-center">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 1.2, 1],
                    opacity: 1,
                }}
                transition={{
                    duration: 0.6,
                    ease: "backOut"
                }}
                className="position-relative mb-4"
            >
                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                >
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#7c7b7b2a"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M30,50 L45,65 L70,35"
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            delay: 0.5,
                            duration: 0.5,
                            ease: "easeInOut"
                        }}
                    />
                </svg>
            </motion.div>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <h1 className="fw-bold mb-3 text-white">
                    Token Verified!
                </h1>
                <p className="custom-text mb-4">
                    You're now being redirected to the home page.
                </p>
            </motion.div>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="position-relative my-4"
            >
                <svg width="60" height="60">
                    <circle
                        cx="30"
                        cy="30"
                        r="28"
                        fill="none"
                        stroke="#7c7b7b2a"
                        strokeWidth="2"
                    />
                    <motion.circle
                        cx="30"
                        cy="30"
                        r="28"
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth="3"
                        strokeLinecap="round"
                        pathLength="1"
                        initial={{ pathLength: 1 }}
                        animate={{ pathLength: 0 }}
                        transition={{
                            duration: 5,
                            ease: "linear"
                        }}
                        transform="rotate(-90 30 30)"
                    />
                    <text
                        x="30"
                        y="35"
                        textAnchor="middle"
                        fill="white"
                        fontSize="16"
                        fontWeight="bold"
                    >
                        {countdown}
                    </text>
                </svg>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{
                    scale: 1.05,
                    backgroundColor: "#2b2b2b"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="d-flex align-items-center justify-content-center gap-2 px-5 py-3 rounded-3 cursor-pointer"
                style={{
                    backgroundColor: "#1c1c1c",
                    border: "1px solid #7c7b7b2a",
                    color: "#858585",
                    minWidth: "220px",
                    transition: "all 0.2s linear"
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="me-2"
                >
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                </svg>
                <span className="fw-bold">Return Home Now</span>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-3 custom-text"
            >
                Click above or wait {countdown} second{countdown !== 1 ? 's' : ''}
            </motion.p>
        </div>
    );
};

const Verify = () => {
    const { isVerifying, isVerified, error } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()
    const token = new URLSearchParams(location.search).get("token");

    const [emptyToken, setEmptyToken] = useState(false)

    useEffect(() => {
        if (!token) {
            setEmptyToken(true)
            return;
        }

        const payload = { token }
        dispatch(verifyMagicLink(payload))
    }, []) 
    
    // Handle error state
    if (error) {
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center p-4">
                <div className="text-center p-5 rounded" style={{
                    maxWidth: "500px",
                    width: "100%",
                    backgroundColor: "#1c1c1c",
                    border: "1px solid #7c7b7b2a"
                }}>
                    <div className="mb-4 custom-transparent">
                        <div className="d-inline-flex p-4 rounded-circle" style={{ backgroundColor: "#2b2b2b" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="#ff6b6b" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>

                    <h4 className="fw-semibold mb-3 text-white">
                        Verification Failed
                    </h4>

                    <p className="mb-4 px-3 custom-text" style={{ lineHeight: '1.6' }}>
                        {error || "The verification link has expired or is invalid."}
                    </p>

                    <div className="mt-3 custom-transparent">
                        <button
                            onClick={() => navigate("/")}
                            className="btn px-4 py-2 rounded-3"
                            style={{
                                backgroundColor: "#2b2b2b",
                                color: "#858585",
                                border: "1px solid #7c7b7b2a"
                            }}
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {emptyToken ? (
                <EmptyState navigate={navigate} />
            ) : isVerifying ? (
                <VerificationLoader />
            ) : (
                <Redirect navigate={navigate} />
            )}
        </div>
    )
}

export default Verify