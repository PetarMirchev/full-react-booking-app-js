//our search to be used in everywhere (dates, number of adult and children, rooms to book)
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    },
};

export const SearchContext = createContext(INITIAL_STATE);

//*********************************************************************** */


const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH": return action.payload
        case "RESET_SEARCH": return INITIAL_STATE
        default: return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
        <SearchContext.Provider value={{ city: state.city, dates: state.dates, options: state.options, dispatch, }}>
            {children}
        </SearchContext.Provider>
    );

};

//<SearchContext.Provider is used in index.js in ReactDOM ---> root.render(...