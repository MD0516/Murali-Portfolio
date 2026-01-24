import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";

const stateContext = createContext();

export const useStateContext = () => useContext(stateContext);

export const StateProvider = ({ children }) => {

    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showText, setShowText] = useState(true);
    const [activeGrow, setActiveGrow] = useState(true);
    const [addProject, setAddProject] = useState(false);
    const [toasts, setToasts] = useState([])

    const Toast = useMemo(() => {
        const dismiss = (id) => {
            setToasts((prev) => prev.filter(t => t.id !== id))
        }

        const update = (id, updates) => {
            setToasts((prev) => {
                return prev.map((t) => {
                    if (t.id === id) {
                        return { ...t, ...updates }
                    }
                    return t;
                })
            })

            if (updates.type && updates.type !== "loading") {
                const duration = updates.duration || 2000;
                setTimeout(() => dismiss(id), duration)
            }
        }

        const addToast = (type, title, message, duration = 2000, delay) => {
            const id = Date.now();

            setToasts(prev => [{ id, type, title, message, duration, delay }, ...prev])

            if (type !== "loading") {
                setTimeout(() => dismiss(id), duration)
            }

            return id
        }

        return {
            success: (title, message, duration = 2000, delay) =>
                addToast("success", title, message, duration, delay),
            error: (title, message, duration = 2000, delay) =>
                addToast("error", title, message, duration, delay),
            info: (title, message, duration = 2000, delay) =>
                addToast("info", title, message, duration, delay),
            loading: (title, message) =>
                addToast("loading", title, message, 0, 0),
            update,
            dismiss
        }
    }, [])

    const handleSidebar = () => {
        setToggleSidebar(prev => !prev);

        if (toggleSidebar) {
            setTimeout(() => setActiveGrow(true), 250);
            setTimeout(() => setShowText(true), 200);
        } else {
            setActiveGrow(false);
            setShowText(false);
        }
    }

    useLayoutEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 769px)');

        const handleResize = () => {
            setIsMobile(mediaQuery.matches);
        };

        handleResize();

        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);


    const contextValues = {
        toggleSidebar,
        showText,
        activeGrow,
        isMobile,
        handleSidebar,
        addProject,
        setAddProject,
        toasts,
        Toast,
    }

    return (
        <stateContext.Provider value={contextValues} >
            {children}
        </stateContext.Provider>
    )
}