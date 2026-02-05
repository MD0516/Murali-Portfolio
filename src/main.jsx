import { StrictMode, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import { router } from './Routes/Routes.jsx';
import { motion, AnimatePresence } from "framer-motion"

const Loader = () => {
    const shapes = useMemo(() => ["square", "pentagon", "diamond", "cross", "octagon"], []);
    const [currentShape, setCurrentShape] = useState(0);
    const SPEED = useRef(1.5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentShape(prev => (prev + 1) % shapes.length);
        }, 600 * SPEED.current);

        return () => clearInterval(interval);
    }, [shapes.length]);

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
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
)
