import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
  darkMode: false,
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatche] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatche }}>
      {children}
    </DarkModeContext.Provider>
  );
};
