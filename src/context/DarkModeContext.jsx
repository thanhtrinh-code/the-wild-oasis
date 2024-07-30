import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModecontext = createContext();

export default function DarkModeProvider({ children }){
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-scheme: dark)').matches, 
    'isDarkMode'); // user OS lighting mode
    function toggleDarkMode(){
        setIsDarkMode(isDarkMode => !isDarkMode);
    }
    useEffect(function() {
        if(isDarkMode){
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        }else{
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    }, [isDarkMode]);
    return (
       <DarkModecontext.Provider value={{isDarkMode, toggleDarkMode}}>
        {children}
       </DarkModecontext.Provider>
    );
}

function useDarkMode(){
    const context = useContext(DarkModecontext);
    if(context === undefined){
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
}
export { DarkModeProvider, useDarkMode };