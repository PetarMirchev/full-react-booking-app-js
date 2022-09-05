
const DarkModeReducer = (state, action) => {
    switch (action.type) {
        case "LIGHT": {
            return {
                darkMode: false,
            };
        }

        case "DARK": {
            return {
                darkMode: true,
            };
        }

        // for the 'Moon' button to change -- will look in  DarkModeContext.js-->'INITIAL_STATE' for the status(true or false)
        case "TOGGLE": {
            return {
                darkMode: !state.darkMode,
            };
        }

        default: return state;
    }
};


export default DarkModeReducer;