import { createContext, useContext, useReducer } from "react";
import { storeReducer, initialStore } from "../store";

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
    const [store, dispatch] = useReducer(storeReducer, initialStore);
    return (
        <GlobalContext.Provider value={{ store, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalReducer = () => useContext(GlobalContext);
export default useGlobalReducer;
