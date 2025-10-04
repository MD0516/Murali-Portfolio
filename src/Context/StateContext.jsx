import { createContext, useContext, useLayoutEffect, useState } from "react";

const stateContext = createContext();

export const useStateContext = () => useContext(stateContext);

export const StateProvider = ({ children }) => {

    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showText, setShowText] = useState(true);
    const [activeGrow, setActiveGrow] = useState(true);

    const handleSidebar = () => {
        setToggleSidebar(prev => !prev);

        if (toggleSidebar) {
            setTimeout(() => setActiveGrow(true), 250);
            setTimeout(() => setShowText(true), 50);
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
    }

    return (
        <stateContext.Provider value={contextValues} >
            {children}
        </stateContext.Provider>
    )
}