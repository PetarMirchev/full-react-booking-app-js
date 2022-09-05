import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";


const INITIAL_STATE = {
    darkMode: false,
};

//auer Context export to be rich everywhere and used
export const DarkModeContext = createContext(INITIAL_STATE);

// to rich data in the 'INITIAL_STATE' need to have:
export const DarkModeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

    return (
        <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
            {children}
        </DarkModeContext.Provider>
    );
};