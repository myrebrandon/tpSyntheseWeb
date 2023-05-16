import { createContext } from "react";

const useContext = createContext({
    token: null,
    type: "guess",
    userId: null,
    handleLogin: () => {},
    handleLogout: () => {},
});

export default useContext;